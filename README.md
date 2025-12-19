# opencode-conductor

A reusable OpenCode plugin that ports the Gemini CLI Conductor's "Context-Driven Development" workflow.

## Installation

Add to your `opencode.jsonc` plugins array:

```json
{
  "plugin": [
    "opencode-conductor@latest"
  ]
}
```

Or install locally with mise:

```bash
# Clone the repository
git clone https://github.com/NocturnLabs/opencode-conductor.git
cd opencode-conductor

# Install the plugin and commands
mise run install
```

## Commands

- `/conductor-setup`: Initialize the `conductor/` directory with context files.
- `/conductor-new id:"feat-name" title:"Feature Title"`: Create a new development track.
- `/conductor-do id:"track-id"`: Read context/plan and implement tasks.
- `/conductor-status`: View the current progress of all tracks.

## Directory Structure

```text
conductor/
├── product.md       # Product mission
├── tech-stack.md    # Frameworks & tools
├── workflow.md      # Standards
├── tracks.md        # Index of tracks
└── tracks/
    └── track-id/
        ├── spec.md      # Specification
        ├── plan.md      # Step-by-step implementation plan
        └── metadata.json # Status tracking
```

## Publishing

To publish a new version:

```bash
npm version patch  # or minor/major
git push --tags
```

GitHub Actions will automatically publish to NPM.
