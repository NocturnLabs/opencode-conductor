---
name: conductor-do
description: Implement tasks from the current track's plan
args:
  id: Track ID to work on
---

I will read the context and the current plan for track "{{id}}", then start implementing the pending tasks.

**Context:**
<call:conductor_get_context />

**Current Plan for {{id}}:**
<call:conductor_read_plan id="{{id}}" />

I'll start with the first uncompleted task. After each task, I'll update the plan status.
