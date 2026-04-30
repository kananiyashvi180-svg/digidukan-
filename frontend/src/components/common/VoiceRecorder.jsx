import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, RotateCcw, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceRecorder = ({ onTranscript }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'hi-IN'; // Default to Hindi, can be changed

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setError(event.error);
        setIsRecording(false);
      };
    } else {
      setError('Web Speech API is not supported in this browser.');
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      if (onTranscript) onTranscript(transcript);
    } else {
      setTranscript('');
      setError(null);
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleReset = () => {
    setTranscript('');
    setError(null);
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
      <div className="relative">
        <AnimatePresence>
          {isRecording && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-red-100 rounded-full"
            />
          )}
        </AnimatePresence>
        <button 
          onClick={toggleRecording}
          className={`relative z-10 p-6 rounded-full transition-all ${isRecording ? 'bg-red-500 text-white shadow-red-200' : 'bg-primary text-white shadow-gray-200'} shadow-2xl hover:scale-110 active:scale-95`}
        >
          {isRecording ? <Square size={32} /> : <Mic size={32} />}
        </button>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {isRecording ? 'Listening...' : 'Tap to start speaking'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Tell us your shop name and what you sell.
        </p>
      </div>

      {transcript && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm min-h-[100px]"
        >
          <p className="text-gray-700 leading-relaxed italic">"{transcript}"</p>
        </motion.div>
      )}

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <div className="flex space-x-4">
        {transcript && !isRecording && (
          <button 
            onClick={handleReset}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RotateCcw size={18} />
            <span className="text-sm font-medium">Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
