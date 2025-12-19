# OpenCode Conductor

[![npm version](https://img.shields.io/npm/v/opencode-conductor.svg)](https://www.npmjs.com/package/opencode-conductor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**OpenCode Conductor** is a reusable plugin for the [OpenCode](https://opencode.ai) ecosystem. It ports the powerful "Context-Driven Development" (CDD) workflow originally popularized by the Gemini CLI Conductor, enabling AI agents to build complex features with high precision by grounding them in your project's specific product mission, technical stack, and development standards.

## 🚀 Why Conductor?

AI agents often fail on large tasks because they lose context or make assumptions that contradict your project's architecture. Conductor solves this by:

1.  **Grounding**: Every implementation is preceded by a read of your core context files (`product.md`, `tech-stack.md`, `workflow.md`).
2.  **Tracking**: Complex features are broken down into "Tracks," each with its own specification and step-by-step implementation plan.
3.  **State Management**: It maintains a clear record of what has been built, what is pending, and how the feature was specified.

---

## 📦 Installation

### As an OpenCode Plugin (Recommended)

Add the plugin to your global `opencode.jsonc` configuration (usually found in `~/.config/opencode/opencode.jsonc`):

```json
{
  "plugin": [
    "opencode-conductor@latest"
  ]
}
```

OpenCode will automatically download and load the plugin the next time you start a session.

### For Local Development

If you want to modify the plugin or use it locally without publishing:

```bash
git clone https://github.com/NocturnLabs/opencode-conductor.git
cd opencode-conductor

# Install dependencies
npm install

# Build and install locally using mise
mise run install
```

---

## 🛠️ Getting Started

### 1. Initialize the Project
In any project directory, run:
```text
/conductor-setup
```
This creates a `conductor/` directory at your project root with template files.

### 2. Define Your Context
Open the generated files and fill them out. The better the context, the better the AI's implementation:
-   **`conductor/product.md`**: What is this project? Who is it for? What is the core mission?
-   **`conductor/tech-stack.md`**: Which frameworks are we using? (e.g., Next.js, Tailwind, Prisma). Any specific versions?
-   **`conductor/workflow.md`**: How do we code? (e.g., "Use functional components," "All tests in `tests/`," "Use TSDoc").

### 3. Create a New Track
When you're ready to build a feature, create a track:
```text
/conductor-new id:"auth-system" title:"JWT Authentication System"
```
This creates `conductor/tracks/auth-system/` with `spec.md` and `plan.md`.

### 4. Implement the Feature
Run the "do" command to let the agent start working:
```text
/conductor-do id:"auth-system"
```
The agent will:
1.  Read all your core context files.
2.  Read the track's specification and plan.
3.  Execute the next uncompleted task in the plan.
4.  Mark the task as completed when finished.

---

## 📜 Command Reference

| Command | Description | Arguments |
| :--- | :--- | :--- |
| `/conductor-setup` | Scaffolds the `conductor/` directory and context files. | None |
| `/conductor-new` | Creates a new development track with spec/plan templates. | `id` (string), `title` (string) |
| `/conductor-do` | Reads context and implements pending tasks for a track. | `id` (string) |
| `/conductor-status` | Provides a high-level summary of all tracks and context health. | None |

---

## 📁 Directory Structure

```text
conductor/
├── product.md       # High-level product mission
├── tech-stack.md    # Frameworks, languages, and tools
├── workflow.md      # Coding standards and processes
├── tracks.md        # Index of all tracks (managed by plugin)
└── tracks/          # Feature-specific directories
    └── track-id/
        ├── spec.md      # Detailed technical specification
        ├── plan.md      # Checkbox-list of implementation tasks
        └── metadata.json # Status, title, and timestamps
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Publishing to NPM
To publish a new version (org members only):
1.  Update version in `package.json`.
2.  Commit and push:
    ```bash
    npm version patch # or minor/major
    git push --tags
    ```
3.  GitHub Actions will handle the NPM release.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
