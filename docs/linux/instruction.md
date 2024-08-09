# Linux 常用指令

Linux 系统中包含了大量的命令行指令（也称为 shell 命令），这些指令是用户和操作系统交互的主要方式。下面我将介绍一些 Linux 中最常用的命令，并给出每个命令的代码示例。

## 1. `ls` - 列出目录内容

- 示例：列出当前目录下的所有文件和文件夹。
  ```bash
  ls
  ```
- 示例：列出当前目录下所有文件（包括隐藏文件），并显示详细信息。
  ```bash
  ls -la
  ```

## 2. `cd` - 更改目录

- 示例：进入名为 "Documents" 的目录。
  ```bash
  cd Documents
  ```
- 示例：返回用户的主目录。
  ```bash
  cd ~
  ```

## 3. `pwd` - 显示当前工作目录的完整路径

- 示例：显示当前工作目录。
  ```bash
  pwd
  ```

## 4. `mkdir` - 创建目录

- 示例：创建一个名为 "new_folder" 的新目录。
  ```bash
  mkdir new_folder
  ```
- 示例：同时创建多个目录（需要空格分隔）。
  ```bash
  mkdir dir1 dir2 dir3
  ```

## 5. `rm` - 删除文件或目录

- 示例：删除名为 "file.txt" 的文件。
  ```bash
  rm file.txt
  ```
- 示例：删除名为 "dir" 的目录及其内容（使用 `-r` 选项进行递归删除）。
  ```bash
  rm -r dir
  ```
- 注意：使用 `rm` 命令时要特别小心，尤其是配合 `-r` 选项时，因为这会删除目录及其所有内容且无法恢复。

## 6. `cp` - 复制文件或目录

- 示例：将 "file.txt" 复制到 "backup" 目录。
  ```bash
  cp file.txt backup/
  ```
- 示例：复制目录（使用 `-r` 选项进行递归复制）。
  ```bash
  cp -r dir1 dir2
  ```

## 7. `mv` - 移动或重命名文件或目录

- 示例：将 "file.txt" 移动到 "Documents" 目录。
  ```bash
  mv file.txt Documents/
  ```
- 示例：将 "old_name.txt" 重命名为 "new_name.txt"。
  ```bash
  mv old_name.txt new_name.txt
  ```

## 8. `cat` - 查看文件内容、创建文件、文件合并

- 示例：查看 "file.txt" 的内容。
  ```bash
  cat file.txt
  ```
- 示例：将 "file1.txt" 和 "file2.txt" 的内容合并到 "file3.txt"。
  ```bash
  cat file1.txt file2.txt > file3.txt
  ```

## 9. `grep` - 文本搜索工具

- 示例：在 "file.txt" 中搜索包含 "text" 的行。
  ```bash
  grep "text" file.txt
  ```

## 10. `find` - 查找文件和目录

- 示例：在 "/home" 目录及其子目录下查找所有 ".txt" 文件。
  ```bash
  find /home -type f -name "*.txt"
  ```

## 11. `touch` - 创建空文件或更改文件时间戳

- 示例：创建一个名为 "newfile.txt" 的空文件。
  ```bash
  touch newfile.txt
  ```

## 12. `chmod` - 更改文件或目录的权限

- 示例：将 "file.txt" 的权限更改为所有者可读写执行，组用户和其他用户可执行。
  ```bash
  chmod 755 file.txt
  ```
  或者使用符号模式：
  ```bash
  chmod u=rwx,go=rx file.txt
  ```

## 13. `chown` - 更改文件或目录的所有者和/或组

- 示例：将 "file.txt" 的所有者更改为用户 "user" 和组 "group"。
  ```bash
  chown user:group file.txt
  ```

## 14. `du` - 显示目录或文件的磁盘使用情况

- 示例：显示 "dir" 目录的总磁盘使用情况。
  ```bash
  du -sh dir
  ```
  `-s` 表示汇总每个参数的大小，`-h` 表示以易读的格式（如 KB、MB）显示。

## 15. `df` - 显示文件系统的磁盘空间占用情况

- 示例：显示所有已挂载文件系统的磁盘空间使用情况。
  ```bash
  df -h
  ```
  `-h` 参数同样用于以易读的格式显示。

## 16. `head` 和 `tail` - 查看文件的开头和结尾部分

- `head` 示例：查看 "file.txt" 的前 10 行。

  ```bash
  head file.txt
  ```

  查看前 n 行，可以使用 `-n` 选项。

- `tail` 示例：查看 "file.txt" 的最后 10 行。
  ```bash
  tail file.txt
  ```
  实时查看文件新增内容（如日志文件），可以使用 `-f` 选项。

## 17. `ps` - 显示当前进程的快照

- 示例：显示当前所有进程的详细信息。
  ```bash
  ps -ef
  ```
  `-e` 表示显示所有进程，`-f` 表示全格式显示。

## 18. `kill` - 发送信号到进程

- 示例：终止进程 ID 为 1234 的进程。
  ```bash
  kill 1234
  ```
  可以使用不同的信号，`-9`（SIGKILL）是常用的强制终止信号。

## 19. `top` - 实时显示系统中各个进程的资源占用状况

- 示例：运行 `top` 命令查看系统资源使用情况。
  ```bash
  top
  ```
  在 `top` 运行中，可以通过按键（如 `q` 退出）进行交互。

## 20. `wget` - 从网络上自动下载文件

- 示例：从 URL 下载文件并保存到当前目录。
  ```bash
  wget http://example.com/file.zip
  ```

## 21. `curl` - 传输数据的命令行工具

- 示例：使用 `curl` 下载文件并保存到指定名称。
  ```bash
  curl -O http://example.com/file.zip
  ```
  或使用 `-o` 选项指定输出文件名。

## 22. `history` - 显示历史命令

- 示例：显示最近的命令历史。
  ```bash
  history
  ```
  可以使用 `!n`（n 为命令编号）来执行历史中的命令。

## 23. `sudo` - 以另一个用户的身份执行命令（通常是超级用户）

- 示例：以超级用户身份运行 `apt-get update`。
  ```bash
  sudo apt-get update
  ```

这些命令覆盖了文件操作、权限管理、进程管理、网络下载、历史记录查看等多个方面，是 Linux 系统中非常实用的工具。

这些只是 Linux 命令行中一小部分常用命令的示例。Linux 提供了极其丰富的命令和工具，可以执行各种复杂的任务。掌握这些基本命令对于有效使用 Linux 系统至关重要。
