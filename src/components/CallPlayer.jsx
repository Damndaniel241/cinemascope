import React, { useEffect, useState } from 'react';

function CallPlayer({ frameId }) {
  const [iframe, setIframe] = useState(null);
  const [queue, setQueue] = useState([]);
  const [domReady, setDomReady] = useState(false);


  // Function to send a message to the iframe
  function sendMessage(data) {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(data, '*');
    }
  }

  useEffect(() => {
    // Function to handle the "message" event
    function messageEvent(add, listener) {
      const w3 = add ? window.addEventListener : window.removeEventListener;
      w3
        ? w3('message', listener, false)
        : (add ? window.attachEvent : window.detachEvent)('onmessage', listener);
    }

    

    // Function to handle the queue and execute functions
    function handleQueue() {
      while (queue.length > 0) {
        const [func, args] = queue.shift();
        if (typeof func === 'function') {
          func(...args);
        }
      }
    }

    // Function to run once the iframe is ready
    function runOnceReady(e) {
      if (!iframe) {
        setIframe(document.getElementById(frameId));
      }

      if (e.source === iframe.contentWindow) {
        clearInterval(queue.poller);
        setQueue((prevQueue) => {
          prevQueue.ready = true;
          return prevQueue;
        });

        messageEvent(0, runOnceReady);
        handleQueue();
      }
    }

    // Function to check DOM readiness
    function checkDOMReady() {
      if (document.readyState === 'complete') {
        setDomReady(true);
        messageEvent(0, checkDOMReady);
        handleQueue();
      }
    }

    // When the component mounts, set up event listeners and handle the queue
    messageEvent(1, runOnceReady);

    // Handle the queue when the DOM is ready
    if (document.readyState === 'complete') {
      setDomReady(true);
      handleQueue();
    } else {
      messageEvent(1, checkDOMReady);
    }

    // Cleanup effect
    return () => {
      messageEvent(0, runOnceReady);
      messageEvent(0, checkDOMReady);
    };
  }, [frameId, iframe, queue]);

  // Expose a method to add functions to the queue
  function addToQueue(func, args) {
    setQueue((prevQueue) => [...prevQueue, [func, args]]);
  }

  // Expose a method to send the "listener" message
  function sendListeningMessage() {
    const data = `{"event":"listening","id":${JSON.stringify(frameId)}}`;
    sendMessage(data);
  }

  // Render nothing (this component is used for its side effects)
  return null;
}

export default CallPlayer;

