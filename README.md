# Odin To-Do App

## Description

This is my implementation of the Todo List project from the JavaScript course of the Odin Project's Full Stack JavaScript curriculum.

The app is constructed of linked modules and bundled using webpack.

I built out a tabbed browsing experience to switch between task view and project view.

Users can navigate to individual project pages which show only the tasks assigned to the selected project.

Priority is indicated by color-coding on the task's completeion checkbox. Users can also toggle showing and hiding completed projects.

All tasks and projects are fully editable.

When a user deletes a project, all tasks assigned to that project are deleted as well.

I used the date-fns library to provide support for due dates, and I also implemented flags that communicate days remaining until a given task is due, as well as if a task is overdue.

Overall, this project represents a significant jump in logical and architectural complexity in my learning process. The styling and functionality are both fairly bare-bones, and even this relatively basic app experience took quite a bit of work to stand up.