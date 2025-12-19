---
name: conductor-new
description: Create a new development track (feature or bug)
args:
  id: Unique ID for the track (e.g., feat-login)
  title: Title of the track
---

I will create a new track for "{{title}}" with ID "{{id}}". This includes a spec, a plan, and metadata tracking.

<call:conductor_create_track id="{{id}}" title="{{title}}" />

The track has been created. You can now define the specification in `conductor/tracks/{{id}}/spec.md` and the implementation steps in `conductor/tracks/{{id}}/plan.md`.
