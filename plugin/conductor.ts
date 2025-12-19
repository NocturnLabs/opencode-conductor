import { tool } from "@opencode-ai/plugin/tool";
import type { Plugin } from "@opencode-ai/plugin";
import * as fs from "fs";
import * as path from "path";

const CONDUCTOR_DIR = "conductor";
const TRACKS_DIR = path.join(CONDUCTOR_DIR, "tracks");

export const ConductorPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  /**
   * conductor_init - Scaffold conductor/ directory with context files
   */
  const conductor_init = tool({
    description: "Initialize project with Conductor context files",
    args: {
      product: tool.schema.string().optional().describe("Initial product mission/context"),
      techStack: tool.schema.string().optional().describe("Initial tech stack details"),
      workflow: tool.schema.string().optional().describe("Initial workflow standards"),
    },
    execute: async ({ product, techStack, workflow }) => {
      if (!fs.existsSync(CONDUCTOR_DIR)) fs.mkdirSync(CONDUCTOR_DIR);
      if (!fs.existsSync(TRACKS_DIR)) fs.mkdirSync(TRACKS_DIR);

      const files = {
        "product.md": product ? `# Product Context\n${product}` : "# Product Context\nDescribe the product mission and value proposition.",
        "tech-stack.md": techStack ? `# Tech Stack\n${techStack}` : "# Tech Stack\nList the technologies, frameworks, and tools used.",
        "workflow.md": workflow ? `# Workflow\n${workflow}` : "# Workflow\nDescribe development processes and standards.",
        "tracks.md": "# Tracks Index\nList of all development tracks.",
      };

      for (const [name, content] of Object.entries(files)) {
        const filePath = path.join(CONDUCTOR_DIR, name);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, content);
        }
      }
      return "Conductor initialized successfully.";
    }
  });

  /**
   * conductor_create_track - Create new track with spec.md, plan.md, metadata.json
   */
  const conductor_create_track = tool({
    description: "Create a new development track",
    args: {
      id: tool.schema.string().describe("Unique ID for the track (e.g., feat-login)"),
      title: tool.schema.string().describe("Title of the track"),
    },
    execute: async ({ id, title }) => {
      const trackPath = path.join(TRACKS_DIR, id);
      if (fs.existsSync(trackPath)) throw new Error(`Track ${id} already exists.`);

      fs.mkdirSync(trackPath);

      const specContent = `# Spec: ${title}\n## Goals\n## Requirements`;
      const planContent = `# Plan: ${title}\n## Tasks\n- [ ] Task 1`;
      const metadata = {
        id,
        title,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      fs.writeFileSync(path.join(trackPath, "spec.md"), specContent);
      fs.writeFileSync(path.join(trackPath, "plan.md"), planContent);
      fs.writeFileSync(path.join(trackPath, "metadata.json"), JSON.stringify(metadata, null, 2));

      // Update tracks.md
      const tracksFile = path.join(CONDUCTOR_DIR, "tracks.md");
      if (!fs.existsSync(tracksFile)) {
        fs.writeFileSync(tracksFile, "# Tracks Index\nList of all development tracks.");
      }
      const tracksContent = fs.readFileSync(tracksFile, "utf-8");
      fs.writeFileSync(tracksFile, `${tracksContent}\n- [ ] ${id}: ${title}`);

      return `Track ${id} created at ${trackPath}`;
    }
  });

  /**
   * conductor_get_context - Read all context files
   */
  const conductor_get_context = tool({
    description: "Read all Conductor context files",
    args: {},
    execute: async () => {
      const files = ["product.md", "tech-stack.md", "workflow.md", "tracks.md"];
      let context = "";
      for (const file of files) {
        const filePath = path.join(CONDUCTOR_DIR, file);
        if (fs.existsSync(filePath)) {
          context += `\n--- ${file} ---\n${fs.readFileSync(filePath, "utf-8")}\n`;
        }
      }
      return context;
    }
  });

  /**
   * conductor_read_plan - Get current track's plan and status
   */
  const conductor_read_plan = tool({
    description: "Read the plan for a specific track",
    args: { id: tool.schema.string().describe("Track ID") },
    execute: async ({ id }) => {
      const planPath = path.join(TRACKS_DIR, id, "plan.md");
      if (!fs.existsSync(planPath)) throw new Error(`Plan for track ${id} not found.`);
      return fs.readFileSync(planPath, "utf-8");
    }
  });

  /**
   * conductor_update_task - Update task completion markers
   */
  const conductor_update_task = tool({
    description: "Mark a task as completed in a track's plan",
    args: {
      id: tool.schema.string().describe("Track ID"),
      taskName: tool.schema.string().describe("The exact text of the task to mark as complete"),
    },
    execute: async ({ id, taskName }) => {
      const planPath = path.join(TRACKS_DIR, id, "plan.md");
      if (!fs.existsSync(planPath)) throw new Error(`Plan for track ${id} not found.`);

      let content = fs.readFileSync(planPath, "utf-8");
      const updatedContent = content.replace(new RegExp(`- \\[ \\] ${taskName}`, "g"), `- [x] ${taskName}`);

      if (content === updatedContent) {
        return `Task "${taskName}" not found or already completed.`;
      }

      fs.writeFileSync(planPath, updatedContent);
      return `Task "${taskName}" marked as completed in track ${id}.`;
    }
  });

  return {
    tool: {
      conductor_init,
      conductor_create_track,
      conductor_get_context,
      conductor_read_plan,
      conductor_update_task,
    },
  };
};
