import React, { useState, useEffect, useRef } from 'react';
import fileSystem from './fileSystem';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [currentDir, setCurrentDir] = useState('C:\\users\\coen\\repos\\website');
  const [startTime, setStartTime] = useState(Date.now());
  const terminalRef = useRef(null);

  const handleInput = (event) => {
    if (event.key === 'Enter') {
      executeCommand(input.trim());
      setInput('');
    }
  };

  const executeCommand = (command) => {
    let response = '';
    const [cmd, ...args] = command.split(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        response = '- start \n- stop \n \n figure the rest out yourself :) \n source code on <a id="github-link" href="https://github.com/coen-h/website" target="_blank">Github</a>';
        break;
      case 'time':
        response = new Date().getTime();
        break;
      case 'date':
        response = new Date().toLocaleDateString();
        break;
      case 'clear':
        setOutput([]);
        return;
      case 'whoami':
        response = 'desktop-838oidf\\coen';
        break;
      case 'hero':
        response = `                                      
        .                                .                      
                    .                                           
                                                                
                  @.                                      .     
                 .@..             .             .@.            
  .              :%.                             %=            
                 @:                              .@            
                .@.                              .@             
                =%.                    .         .@.            
                @.                               .@.            
         .     .@.                               .@.            .
               =#                                .@.             
               @.                                .@             
               @%%%%#=:....                      .@            
              =#.      .......:--++%%%%@@@@@@@@@@++             
              @:                                .@.             
             .@.                                .@              
             .@.                               .#=              
             +*                                .@.      .       
    .        #: .                              .@               
            .@.                                :#               
            .@.              .                 :#               
            .@.                                .@-              
            :%.                                 .@:             
                                          .      :%             
                                                 .@             
                 .                                              
                                                               .                                                                                          
        `
        break;
      case 'neofetch':
        response = generateNeofetch();
        break;
      case 'ls':
        response = listDirectory(currentDir);
        break;
      case 'cd':
        response = changeDirectory(args[0]);
        break;
      case 'mkdir':
        response = `mkdir: cannot create directory '${args[0]}': Permission denied`;
        break;
      case 'pwd':
        response = `${currentDir}`;
        break;
      case 'touch':
        response = `touch: cannot touch '${args[0]}': Permission denied`;
        break;
      case 'rm':
        if (args[0] === '-rf' || args[0] === 'App.jsx' || args[0] === 'main.jsx' || args[0] === 'Terminal.jsx' || args[0] === 'index.html' || args[0] === 'package.json') {
          response = 'dont do that!';
        }
        else {
          response = 'Careful removing files!'
        }
        break;
      case 'cp':
        response = `cp: cannot copy '${args[0]}' to '${args[1]}': Permission denied`;
        break;
      case 'mv':
        response = `mv: cannot move '${args[0]}' to '${args[1]}': Permission denied`;
        break;
      case 'start':
        response = startSite();
        break;
      case 'stop':
        response = stopSite();
        break;
      default:
        response = `Command not found: ${command}`;
    }

    setOutput((prevOutput) => [
      ...prevOutput,
      { command: command, response: response },
    ]);
  };

  const generateNeofetch = () => {
    const uptime = Date.now() - startTime;
    const uptimeString = formatUptime(uptime);

    return `
        ,.=:!!t3Z3z.,                   coen@DESKTOP-8380IDF   
       :tt:::tt333EE3                   ---------------------                    
       Et:::ztt33EEEL @Ee.,      ..,    OS: Windows 11 Pro x86_64
      ;tt:::tt333EE7 ;EEEEEEttttt33#    Host: Gigabyte Technology Co., Ltd. B660M DS3H AX DDR4
     :Et:::zt333EEQ. $EEEEEttttt33QL    Kernel: 10.0.22000
     it::::tt333EEF @EEEEEEttttt33F     Uptime: ${uptimeString}
    ;3=*^\`\`\`"*4EEV :EEEEEEttttt33@.     Shell: bash 5.2.15
    ,.=::::!t=., \` @EEEEEEtttz33QF      Resolution: 1920x1080
   ;::::::::zt33)   "4EEEtttji3P*       DE: Aero
  :t::::::::tt33.:Z3z..  \`\` ,..g.       WM: Explorer
  i::::::::zt33F AEEEtttt::::ztF        WM Theme: dark
 ;:::::::::t33V ;EEEttttt::::t3         Terminal: Windows Terminal
 E::::::::zt33L @EEEtttt::::z3F         CPU: 12th Gen Intel i5-12400F (12) @ 2.496GHz
{3=*^\`\`\`"*4E3) ;EEEtttt:::::tZ\`         GPU: NVIDIA GeForce RTX 3060 Ti
             \` :EEEEtttt::::z7          Memory: 6281MiB / 16235MiB
                 "VEzjt:;;z>*\`         
          `;
  };

  const formatUptime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    if (days === 0) {
      if (hours === 0) {
        if (minutes === 0) {
          return `${seconds} secs`;
        }
        else {
          return `${minutes} mins`
        }
      }
      else {
        return `${hours} hours, ${minutes} mins`
      }
    }
    else {
      return `${days} days, ${hours} hours, ${minutes} mins`
    }
  };
  
  const listDirectory = (dir) => {
    const contents = fileSystem[dir];
    if (!contents) return `Directory not found: ${dir}`;

    const result = [];
    for (const [name, type] of Object.entries(contents)) {
      const isDirectory = type !== 'file';
      result.push(`${isDirectory ? 'd-----' : '-a----'}   ${new Date().toLocaleString()}   ${isDirectory ? '4096' : ' 147'}   ${name}`);
    }
    return result.join('\n');
  };

  const changeDirectory = (dir) => {
    if (dir === '..') {
      const parentDir = currentDir.substring(0, currentDir.lastIndexOf('\\'));
      if (parentDir) {
        setCurrentDir(parentDir);
        return ``;
      }
      return 'No parent directory';
    }

    const newDir = currentDir + '\\' + dir;
    if (fileSystem[newDir]) {
      setCurrentDir(newDir);
      return ``;
    }
    return `Directory not found: ${dir}`;
  };

  const scrollToBottom = () => {
    terminalRef.current.scrollIntoView({ block: 'end' });
  };

  const startSite = () => {
    const site = document.getElementById("site");
    site.style.display = "flex";
  }

  const stopSite = () => {
    const site = document.getElementById("site");
    site.style.display = "none";
  }

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  return (
    <div id="terminal">
      {output.map((item, index) => (
        <div key={index} className="output">
          <pre>{`> ${item.command}`}</pre>
          <pre dangerouslySetInnerHTML={{ __html: item.response }} />
        </div>
      ))}
      <div id="input">
        <input
          className="input"
          aria-label="Input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInput}
        />
      </div>
      <div ref={terminalRef} />
    </div>
  );
};