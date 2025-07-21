import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './VoiceCommand.css';

// Define language options with their display names
const LANGUAGES = {
    'en-US': 'English'
};

function VoiceCommand() {
    const navigate = useNavigate();
    const [currentLang, setCurrentLang] = useState('en-US'); // Default to English for recognition and TTS

    // Function to get the text from the About Me section
    const getAboutMeText = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            // Select all paragraph and strong tags within the about-text div
            const aboutTextDiv = aboutSection.querySelector('.about-text');
            if (aboutTextDiv) {
                // Get all text content, excluding image alt text, and combine it
                const paragraphs = aboutTextDiv.querySelectorAll('p');
                let fullText = '';
                paragraphs.forEach(p => {
                    fullText += p.textContent + ' ';
                });
                return fullText.trim();
            }
        }
        return "I couldn't find the about me section.";
    };

    // Function to speak text using the Web Speech API
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = currentLang; // Use the currently active language for speech output
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Text-to-speech not supported in this browser.");
            alert("Your browser does not support text-to-speech. Please try a different browser like Chrome, Firefox, or Edge.");
        }
    };

    const scrollToSection = (section) => {
        const sectionIdMap = {
            home: 'home',
            about: 'about',
            blog: 'blog',
            certifications: 'certifications',
            contact: 'contact'
        };

        const targetId = sectionIdMap[section.toLowerCase()];
        if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Helper function to switch the active language for recognition
    const switchLanguage = (langCode) => {
        if (currentLang !== langCode) { // Only switch if it's a different language
            setCurrentLang(langCode);
            SpeechRecognition.stopListening(); // Stop current listening session immediately
            // The useEffect below will restart listening with the new langCode
            speakText(`Switching to ${LANGUAGES[langCode]} language.`);
            resetTranscript(); // Clear transcript after language switch
        } else {
            speakText(`${LANGUAGES[langCode]} is already active.`);
        }
    };

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({
        // Pass the current active language to the speech recognition engine
        lang: currentLang,
        commands: [
            {
                command: 'Go to *',
                callback: (section) => {
                    const lower = section.toLowerCase();
                    if (lower === 'admin login' || lower === 'admin') {
                        navigate('/admin/login');
                    } else {
                        scrollToSection(lower);
                    }
                    resetTranscript();
                }
            },
            {
                command: 'Scroll down',
                callback: () => {
                    window.scrollBy({ top: 400, behavior: 'smooth' });
                    resetTranscript();
                }
            },
            {
                command: 'Scroll up',
                callback: () => {
                    window.scrollBy({ top: -400, behavior: 'smooth' });
                    resetTranscript();
                }
            },
            {
                command: 'Who are you',
                callback: () => {
                    const aboutMeContent = getAboutMeText();
                    speakText(aboutMeContent);
                    resetTranscript();
                }
            },
            {
                command: 'Stop listening',
                callback: () => {
                    SpeechRecognition.stopListening();
                    resetTranscript();
                }
            },
            {
                command: 'Start listening',
                callback: () => {
                    // When starting listening manually, ensure it uses the current language
                    SpeechRecognition.startListening({ continuous: true, lang: currentLang });
                    resetTranscript();
                }
            },
            {
                command: 'Clear transcript',
                callback: () => {
                    resetTranscript();
                }
            },
            // --- New Language Switching Commands ---
            {
                command: 'Change to English',
                callback: () => switchLanguage('en-US')
            },
            {
                command: 'Speak in English', // Alternative command
                callback: () => switchLanguage('en-US')
            },
            {
                command: 'Change to Setswana',
                callback: () => switchLanguage('tn-ZA')
            },
            {
                command: 'Speak in Setswana', // Alternative command
                callback: () => switchLanguage('tn-ZA')
            }
            // --- End New Language Switching Commands ---
        ]
    });

    // This useEffect ensures that speech recognition is always active with the correct language
    // It will re-run when `listening` status or `currentLang` changes.
    useEffect(() => {
        if (!listening) { // Only if not currently listening (e.g., stopped by a command or unmount)
            // Start listening with the current language
            SpeechRecognition.startListening({ continuous: true, lang: currentLang });
        }
    }, [listening, currentLang]); // Re-run effect if 'listening' state or 'currentLang' changes

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser does not support speech recognition.</span>;
    }

    return (
        <div className="voice-command">
            <p>{listening ? 'Listening...' : 'Not listening'}</p>
            <p><em>{transcript}</em></p>
        </div>
    );
}

export default VoiceCommand;