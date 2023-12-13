import React from 'react';

function App() {
  const value = 'World';
  var ChromeSamples = {
    log: function() {
      var line = Array.prototype.slice.call(arguments).map(function(argument) {
        return typeof argument === 'string' ? argument : JSON.stringify(argument);
      }).join(' ');

      document.querySelector('#log').textContent += line + '\n';
    },

    clearLog: function() {
      document.querySelector('#log').textContent = '';
    },

    setStatus: function(status) {
      document.querySelector('#status').textContent = status;
    },

    setContent: function(newContent) {
      var content = document.querySelector('#content');
      while(content.hasChildNodes()) {
        content.removeChild(content.lastChild);
      }
      content.appendChild(newContent);
    }
  };
  useEffect(() => {
    if (/Chrome\/(\d+\.\d+.\d+.\d+)/.test(navigator.userAgent)){
      // Let's log a warning if the sample is not supposed to execute on this
      // version of Chrome.
      if (89 > parseInt(RegExp.$1)) {
        ChromeSamples.setStatus('Warning! Keep in mind this sample has been tested with Chrome ' + 89 + '.');
      }
    }

    log = ChromeSamples.log;

    if (!("NDEFReader" in window))
      ChromeSamples.setStatus("Web NFC is not available. Use Chrome on Android.");

    scanButton.addEventListener("click", async () => {
      log("User clicked scan button");
    
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        log("> Scan started");
    
        ndef.addEventListener("readingerror", () => {
          log("Argh! Cannot read data from the NFC tag. Try another one?");
        });
    
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
          log(`> Serial Number: ${serialNumber}`);
          log(`> Records: (${message.records.length})`);
        });
      } catch (error) {
        log("Argh! " + error);
      }
    });
    
    writeButton.addEventListener("click", async () => {
      log("User clicked write button");
    
      try {
        const ndef = new NDEFReader();
        await ndef.write("Hello world!");
        log("> Message written");
      } catch (error) {
        log("Argh! " + error);
      }
    });
    
    makeReadOnlyButton.addEventListener("click", async () => {
      log("User clicked make read-only button");
    
      try {
        const ndef = new NDEFReader();
        await ndef.makeReadOnly();
        log("> NFC tag has been made permanently read-only");
      } catch (error) {
        log("Argh! " + error);
      }
    });
  },[]);

  return  <>
            
            <script>
            </script>

            <h3>Live Output</h3>
            <div id="output" class="output">
              <div id="content"></div>
              <div id="status"></div>
              <pre id="log"></pre>
            </div>

            <script>
            </script>

            <script>
            </script>

            <button id="scanButton">Scan</button>
            <button id="writeButton">Write</button>
            <button id="makeReadOnlyButton">Make Read-Only</button>

            <script>
            </script>

            <div>Hello {value}</div>
          </>;
}

export default App;
