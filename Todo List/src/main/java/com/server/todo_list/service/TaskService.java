package com.server.todo_list.service;

import com.server.todo_list.models.Task;
import com.server.todo_list.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    TaskRepo taskRepo;

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }


    public void createTask(String title) {
        Task task = Task.builder().title(title).build();
        taskRepo.save(task);
    }

    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }

    public boolean toggleTask(Long id) {
        Task task = taskRepo.findById(id).orElseThrow(RuntimeException::new);
        task.setCompleted(!task.isCompleted());
        taskRepo.save(task);
        return task.isCompleted();
    }
}
