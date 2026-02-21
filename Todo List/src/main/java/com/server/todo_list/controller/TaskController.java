package com.server.todo_list.controller;

import com.server.todo_list.models.Task;
import com.server.todo_list.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/todo-list")
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping
    public String getTasks(Model model) {
        List<Task> tasks = taskService.getAllTasks();
        model.addAttribute("tasks", tasks);
        return "todo-list"; // >> template name
    }

    @PostMapping
    public String createTask(@RequestParam String title) {
        taskService.createTask(title);
        return "redirect:/todo-list"; // PRG Pattern (Post => Redirect => Get)
    }

    @PostMapping("/delete/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "redirect:/todo-list";
    }

    @PostMapping("/toggle/{id}")
    @ResponseBody
    public boolean toggleTask(@PathVariable Long id) {
        return taskService.toggleTask(id);
    }

}


