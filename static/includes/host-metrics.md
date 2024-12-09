## Host metrics
Host metrics provide insights into system-level performance, including CPU, memory, disk, and network usage.

### CPU utilization

CPU utilization metrics offer insights into CPU usage. These metrics
include time spent on different processes, system load, and overall uptime.

| Metric                  | Description                                                                                           |
|-------------------------|-------------------------------------------------------------------------------------------------------|
| `cpu_usage_guest`       | CPU time spent running a virtual CPU for guest operating systems                                     |
| `cpu_usage_guest_nice`  | CPU time running low-priority virtual CPUs for guest operating systems; interrupted by higher-priority tasks and measured in hundredths of a second|
| `cpu_usage_idle`        | Time the CPU spends doing nothing                                                                   |
| `cpu_usage_iowait`      | Time waiting for I/O to complete                                                                     |
| `cpu_usage_irq`         | Time servicing interrupts                                                                            |
| `cpu_usage_nice`        | Time running user-niced processes                                                                   |
| `cpu_usage_softirq`     | Time servicing softirqs                                                                         |
| `cpu_usage_steal`       | Time spent in other operating systems when running in a virtualized environment                      |
| `cpu_usage_system`      | Time spent running system processes                                                                  |
| `cpu_usage_user`        | Time spent running user processes                                                                    |
| `system_load1`          | System load average for the last minute                                                              |
| `system_load15`         | System load average for the last 15 minutes                                                          |
| `system_load5`          | System load average for the last 5 minutes                                                           |
| `system_n_cpus`         | Number of CPU cores available                                                                        |
| `system_n_users`        | Number of users logged in                                                                            |
| `system_uptime`         | Time for which the system has been up and running                                                    |

### Disk space utilization

Disk space utilization metrics provide a snapshot of disk usage. These metrics include
information about free and used disk space, as well as `inode` usage and
total disk capacity.

| Metric               | Description                   |
|----------------------|-------------------------------|
| `disk_free`          | Amount of free disk space    |
| `disk_inodes_free`   | Number of free inodes        |
| `disk_inodes_total`  | Total number of inodes       |
| `disk_inodes_used`   | Number of used inodes        |
| `disk_total`         | Total disk space             |
| `disk_used`          | Amount of used disk space    |
| `disk_used_percent`  | Percentage of disk space used|

### Disk input and output

Metrics such as `diskio_io_time` and `diskio_iops_in_progress` provide insights into
disk I/O operations. These metrics cover read/write operations, the duration of these
operations, and the number of bytes read/written.

| Metric                   | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| `diskio_io_time`         | Total time spent on I/O operations                                                                   |
| `diskio_iops_in_progress`| Number of I/O operations currently in progress                                                       |
| `diskio_merged_reads`    | Number of read operations that were merged                                                           |
| `diskio_merged_writes`   | Number of write operations that were merged                                                          |
| `diskio_read_bytes`      | Total bytes read from disk                                                                           |
| `diskio_read_time`       | Total time spent on read operations                                                                  |
| `diskio_reads`           | Total number of read operations                                                                      |
| `diskio_weighted_io_time`| Weighted time spent on I/O operations, considering their duration and intensity                      |
| `diskio_write_bytes`     | Total bytes written to disk                                                                          |
| `diskio_write_time`      | Total time spent on write operations                                                                 |
| `diskio_writes`          | Total number of write operations                                                                     |

### Generic memory

The following metrics, including `mem_active` and `mem_available`, provide insights into
your system's memory usage.

| Metric                   | Description                                                    |
|--------------------------|----------------------------------------------------------------|
| `mem_active`             | Amount of actively used memory                            |
| `mem_available`          | Amount of available memory                                |
| `mem_available_percent`  | Percentage of available memory                            |
| `mem_buffered`           | Amount of memory used for buffering I/O                   |
| `mem_cached`             | Amount of memory used for caching                         |
| `mem_commit_limit`       | Maximum amount of memory that can be committed            |
| `mem_committed_as`       | Total amount of committed memory                          |
| `mem_dirty`              | Amount of memory waiting to be written to disk            |
| `mem_free`               | Amount of free memory                                     |
| `mem_high_free`          | Amount of free memory in the high memory zone             |
| `mem_high_total`         | Total amount of memory in the high memory zone            |
| `mem_huge_pages_free`    | Number of free huge pages                                 |
| `mem_huge_page_size`     | Size of huge pages                                        |
| `mem_huge_pages_total`   | Total number of huge pages                                |
| `mem_inactive`           | Amount of inactive memory                                 |
| `mem_low_free`           | Amount of free memory in the low memory zone              |
| `mem_low_total`          | Total amount of memory in the low memory zone             |
| `mem_mapped`             | Amount of memory mapped into the process's address space  |
| `mem_page_tables`        | Amount of memory used by page tables                      |
| `mem_shared`             | Amount of memory shared between processes                 |
| `mem_slab`               | Amount of memory used by the kernel for data structure caches |
| `mem_swap_cached`        | Amount of swap memory cached                             |
| `mem_swap_free`          | Amount of free swap memory                                |
| `mem_swap_total`         | Total amount of swap memory                               |
| `mem_total`              | Total amount of memory                                    |
| `mem_used`               | Amount of used memory                                     |
| `mem_used_percent`       | Percentage of used memory                                 |
| `mem_vmalloc_chunk`      | Largest contiguous block of vmalloc memory available      |
| `mem_vmalloc_total`      | Total amount of vmalloc memory                            |
| `mem_vmalloc_used`       | Amount of used vmalloc memory                             |
| `mem_wired`              | Amount of wired memory                                    |
| `mem_write_back`         | Amount of memory being written back to disk               |
| `mem_write_back_tmp`     | Amount of temporary memory being written back to disk     |

### Network

The following metrics, including `net_bytes_recv` and `net_packets_sent`, provide insights
into your system's network operations.

| Metric                       | Description                                                                     |
|------------------------------|---------------------------------------------------------------------------------|
| `net_bytes_recv`             | Total bytes received on the network interfaces                                 |
| `net_bytes_sent`             | Total bytes sent on the network interfaces                                     |
| `net_drop_in`                | Incoming packets dropped                                                      |
| `net_drop_out`               | Outgoing packets dropped                                                       |
| `net_err_in`                 | Incoming packets with errors                                                   |
| `net_err_out`                | Outgoing packets with errors                                                   |
| `net_icmp_inaddrmaskreps`    | Number of ICMP address mask replies received                                   |
| `net_icmp_inaddrmasks`       | Number of ICMP address mask requests received                                  |
| `net_icmp_incsumerrors`      | Number of ICMP checksum errors                                                 |
| `net_icmp_indestunreachs`    | Number of ICMP destination unreachable messages received                       |
| `net_icmp_inechoreps`        | Number of ICMP echo replies received                                           |
| `net_icmp_inechos`           | Number of ICMP echo requests received                                          |
| `net_icmp_inerrors`          | Number of ICMP messages received with errors                                   |
| `net_icmp_inmsgs`            | Total number of ICMP messages received                                         |
| `net_icmp_inparmprobs`       | Number of ICMP parameter problem messages received                             |
| `net_icmp_inredirects`       | Number of ICMP redirect messages received                                      |
| `net_icmp_insrcquenchs`      | Number of ICMP source quench messages received                                 |
| `net_icmp_intimeexcds`       | Number of ICMP time exceeded messages received                                 |
| `net_icmp_intimestampreps`   | Number of ICMP timestamp reply messages received                               |
| `net_icmp_intimestamps`      | Number of ICMP timestamp request messages received                             |
| `net_icmpmsg_intype3`        | Number of ICMP type 3 (destination unreachable) messages received              |
| `net_icmpmsg_intype8`        | Number of ICMP type 8 (echo request) messages received                         |
| `net_icmpmsg_outtype0`       | Number of ICMP type 0 (echo reply) messages sent                               |
| `net_icmpmsg_outtype3`       | Number of ICMP type 3 (destination unreachable) messages sent                  |
| `net_icmp_outaddrmaskreps`   | Number of ICMP address mask reply messages sent                                |
| `net_icmp_outaddrmasks`      | Number of ICMP address mask request messages sent                              |
| `net_icmp_outdestunreachs`   | Number of ICMP destination unreachable messages sent                           |
| `net_icmp_outechoreps`       | Number of ICMP echo reply messages sent                                        |
| `net_icmp_outechos`          | Number of ICMP echo request messages sent                                      |
| `net_icmp_outerrors`         | Number of ICMP messages sent with errors                                       |
| `net_icmp_outmsgs`           | Total number of ICMP messages sent                                             |
| `net_icmp_outparmprobs`      | Number of ICMP parameter problem messages sent                                 |
| `net_icmp_outredirects`      | Number of ICMP redirect messages sent                                          |
| `net_icmp_outsrcquenchs`     | Number of ICMP source quench messages sent                                     |
| `net_icmp_outtimeexcds`      | Number of ICMP time exceeded messages sent                                     |
| `net_icmp_outtimestampreps`  | Number of ICMP timestamp reply messages sent                                   |
| `net_icmp_outtimestamps`     | Number of ICMP timestamp request messages sent                                 |
| `net_icmp_outratelimitglobal`| Number of globally rate-limited ICMP messages sent                             |
| `net_icmp_outratelimithost`  | Number of ICMP messages rate-limited per host                                  |
| `net_ip_defaultttl`          | Default time-to-live for IP packets                                            |
| `net_ip_forwarding`          | Indicates if IP forwarding is enabled                                          |
| `net_ip_forwdatagrams`       | Number of forwarded IP datagrams                                               |
| `net_ip_fragcreates`         | Number of IP fragments created                                                 |
| `net_ip_fragfails`           | Number of failed IP fragmentations                                             |
| `net_ip_fragoks`             | Number of successful IP fragmentations                                         |
| `net_ip_inaddrerrors`        | Number of incoming IP packets with address errors                              |
| `net_ip_indelivers`          | Number of incoming IP packets delivered to higher layers                       |
| `net_ip_indiscards`          | Number of incoming IP packets discarded                                        |
| `net_ip_inhdrerrors`         | Number of incoming IP packets with header errors                               |
| `net_ip_inreceives`          | Total number of incoming IP packets received                                   |
| `net_ip_inunknownprotos`     | Number of incoming IP packets with unknown protocols                           |
| `net_ip_outdiscards`         | Number of outgoing IP packets discarded                                        |
| `net_ip_outnoroutes`         | Number of outgoing IP packets with no route available                          |
| `net_ip_outrequests`         | Total number of outgoing IP packets requested to be sent                       |
| `net_ip_outtransmits`        | Number of IP packets transmitted successfully                                  |
| `net_ip_reasmfails`          | Number of failed IP reassembly attempts                                        |
| `net_ip_reasmoks`            | Number of successful IP reassembly attempts                                    |
| `net_ip_reasmreqds`          | Number of IP fragments received needing reassembly                             |
| `net_ip_reasmtimeout`        | Number of IP reassembly timeouts                                               |
| `net_packets_recv`           | Total number of packets received on the network interfaces                     |
| `net_packets_sent`           | Total number of packets sent on the network interfaces                         |
| `netstat_tcp_close`          | Number of TCP connections in the CLOSE state                                   |
| `netstat_tcp_close_wait`     | Number of TCP connections in the CLOSE_WAIT state                              |
| `netstat_tcp_closing`        | Number of TCP connections in the CLOSING state                                 |
| `netstat_tcp_established`    | Number of TCP connections in the ESTABLISHED state                             |
| `netstat_tcp_fin_wait1`      | Number of TCP connections in the FIN_WAIT_1 state                              |
| `netstat_tcp_fin_wait2`      | Number of TCP connections in the FIN_WAIT_2 state                              |
| `netstat_tcp_last_ack`       | Number of TCP connections in the LAST_ACK state                                |
| `netstat_tcp_listen`         | Number of TCP connections in the LISTEN state                                  |
| `netstat_tcp_none`           | Number of TCP connections in the NONE state                                    |
| `netstat_tcp_syn_recv`       | Number of TCP connections in the SYN_RECV state                                |
| `netstat_tcp_syn_sent`       | Number of TCP connections in the SYN_SENT state                                |
| `netstat_tcp_time_wait`      | Number of TCP connections in the TIME_WAIT state                               |
| `netstat_udp_socket`         | Number of UDP sockets                                                          |
| `net_tcp_activeopens`        | Number of active TCP open connections                                          |
| `net_tcp_attemptfails`       | Number of failed TCP connection attempts                                       |
| `net_tcp_currestab`          | Number of currently established TCP connections                                |
| `net_tcp_estabresets`        | Number of established TCP connections reset                                    |
| `net_tcp_incsumerrors`       | Number of TCP checksum errors in incoming packets                              |
| `net_tcp_inerrs`             | Number of incoming TCP packets with errors                                     |
| `net_tcp_insegs`             | Number of TCP segments received                                                |
| `net_tcp_maxconn`            | Maximum number of TCP connections supported                                    |
| `net_tcp_outrsts`            | Number of TCP reset packets sent                                               |
| `net_tcp_outsegs`            | Number of TCP segments sent                                                    |
| `net_tcp_passiveopens`       | Number of passive TCP open connections                                         |
| `net_tcp_retranssegs`        | Number of TCP segments retransmitted                                           |
| `net_tcp_rtoalgorithm`       | TCP retransmission timeout algorithm                                           |
| `net_tcp_rtomax`             | Maximum TCP retransmission timeout                                             |
| `net_tcp_rtomin`             | Minimum TCP retransmission timeout                                             |
| `net_udp_ignoredmulti`       | Number of UDP multicast packets ignored                                        |
| `net_udp_incsumerrors`       | Number of UDP checksum errors in incoming packets                              |
| `net_udp_indatagrams`        | Number of UDP datagrams received                                               |
| `net_udp_inerrors`           | Number of incoming UDP packets with errors                                     |
| `net_udp_memerrors`          | Number of UDP packets dropped due to memory errors                             |
| `net_udplite_ignoredmulti`   | Number of UDP-Lite multicast packets ignored                                   |
| `net_udplite_incsumerrors`   | Number of UDP-Lite checksum errors in incoming packets                         |
| `net_udplite_indatagrams`    | Number of UDP-Lite datagrams received                                          |
| `net_udplite_inerrors`       | Number of incoming UDP-Lite packets with errors                                |
| `net_udplite_memerrors`      | Number of UDP-L

### Kernel

The metrics listed below, such as `kernel_boot_time` and `kernel_context_switches`, provide
insights into the operations of your system's kernel.

| Metric                     | Description                                      |
|----------------------------|--------------------------------------------------|
| `kernel_boot_time`         | Time at which the system was last booted   |
| `kernel_context_switches`  | Number of context switches that have occurred in the kernel |
| `kernel_entropy_avail`     | Amount of available entropy in the kernel's entropy pool |
| `kernel_interrupts`        | Number of interrupts that have occurred     |
| `kernel_processes_forked`  | Number of processes that have been forked   |

### Process

Metrics such as `processes_running` and `processes_zombies` provide insights into the
management of the system's processes.

| Metric                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `processes_blocked`        | Number of processes that are blocked                                       |
| `processes_dead`           | Number of processes that have terminated                                   |
| `processes_idle`           | Number of processes that are idle                                          |
| `processes_paging`         | Number of processes that are paging                                        |
| `processes_running`        | Number of processes currently running                                     |
| `processes_sleeping`       | Number of processes that are sleeping                                      |
| `processes_stopped`        | Number of processes that are stopped                                       |
| `processes_total`          | Total number of processes                                                  |
| `processes_total_threads`  | Total number of threads across all processes                               |
| `processes_unknown`        | Number of processes in an unknown state                                   |
| `processes_zombies`        | Number of zombie processes (terminated but not reaped by parent process)

### Swap usage

Metrics such as `swap_free` and `swap_used` provide insights into the usage of the
system's swap memory.

| Metric             | Description                                      |
|--------------------|--------------------------------------------------|
| `swap_free`        | Amount of free swap memory                      |
| `swap_in`          | Amount of data swapped in from disk             |
| `swap_out`         | Amount of data swapped out to disk              |
| `swap_total`       | Total amount of swap memory                     |
| `swap_used`        | Amount of used swap memory                      |
| `swap_used_percent`| Percentage of swap memory used                  |
