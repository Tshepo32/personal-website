import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './VoiceCommand.css';

// Define language options with their display names
// NOTE: 'tn-ZA' (Setswana) is mentioned in commands but not defined here.
// If you intend to use Setswana, you must add it to this LANGUAGES object
// and ensure your browser supports it for speech recognition and synthesis.
const LANGUAGES = {
    'en-US': 'English',
    // 'tn-ZA': 'Setswana' // Uncomment and add if Setswana is truly supported and needed
};

function VoiceCommand() {
    const navigate = useNavigate();
    const [currentLang, setCurrentLang] = useState('en-US'); // Default to English for recognition and TTS
    const [isListeningActive, setIsListeningActive] = useState(false); // Manages the toggle state

    // Function to get the text from the About Me section
    const getAboutMeText = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            // Get all text content directly from the 'about' section or its primary text container
            const aboutTextDiv = aboutSection.querySelector('.about-text');
            if (aboutTextDiv) {
                // Use textContent directly, which concatenates text nodes
                const text = aboutTextDiv.textContent || aboutTextDiv.innerText;
                if (text && text.trim().length > 0) {
                    return text.trim();
                }
            }
            // Fallback to the entire section's text if .about-text is not found or empty
            const fullSectionText = aboutSection.textContent || aboutSection.innerText;
            if (fullSectionText && fullSectionText.trim().length > 0) {
                return fullSectionText.trim();
            }
        }
        return "I couldn't find detailed content for the about me section.";
    };

    // Function to speak text using the Web Speech API
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = currentLang; // Use the currently active language for speech output
            // Stop any ongoing speech before starting new one to avoid overlapping
            window.speechSynthesis.cancel();
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
                speakText(`Scrolling to ${section} section.`);
            } else {
                speakText(`I couldn't find the ${section} section to scroll to.`);
            }
        } else {
            speakText(`I don't recognize the command to go to ${section}.`);
        }
    };

    // Helper function to switch the active language for recognition
    const switchLanguage = (langCode) => {
        if (!LANGUAGES[langCode]) {
            speakText(`Sorry, ${langCode} is not a supported language.`);
            return;
        }

        if (currentLang !== langCode) {
            setCurrentLang(langCode);
            SpeechRecognition.stopListening();
            setIsListeningActive(false); // Update internal state
            // The useEffect below will handle restarting listening with the new langCode
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
        lang: currentLang,
        commands: [
            {
                // Updated command to handle "Go to home" and other sections more robustly
                command: ['Go to *', 'Navigate to *', 'Show me *', 'Go *'],
                callback: (section) => {
                    const lowerSection = section.toLowerCase();
                    if (lowerSection === 'admin login' || lowerSection === 'admin') {
                        navigate('/admin/login');
                        speakText("Navigating to admin login.");
                    } else if (lowerSection === 'home') { // Explicitly handle 'home' for clarity
                        scrollToSection('home');
                    }
                    else if (['about', 'blog', 'certifications', 'contact'].includes(lowerSection)) {
                        scrollToSection(lowerSection);
                    } else {
                        speakText(`I can't go to "${section}". Please specify a valid section like home, about, blog, certifications, or contact.`);
                    }
                    resetTranscript();
                }
            },
            {
                command: 'Scroll down',
                callback: () => {
                    window.scrollBy({ top: 400, behavior: 'smooth' });
                    speakText("Scrolling down.");
                    resetTranscript();
                }
            },
            {
                command: 'Scroll up',
                callback: () => {
                    window.scrollBy({ top: -400, behavior: 'smooth' });
                    speakText("Scrolling up.");
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
                // Unified command for toggling listening
                command: ['Toggle listening', 'Stop listening', 'Start listening'],
                callback: () => {
                    if (listening) {
                        SpeechRecognition.stopListening();
                        setIsListeningActive(false);
                        speakText("Speech recognition stopped.");
                    } else {
                        // Ensure it starts continuously with the current language
                        SpeechRecognition.startListening({ continuous: true, lang: currentLang });
                        setIsListeningActive(true);
                        speakText("Speech recognition started.");
                    }
                    resetTranscript();
                }
            },
            {
                command: 'Clear transcript',
                callback: () => {
                    resetTranscript();
                    speakText("Transcript cleared.");
                }
            },
            // --- Language Switching Commands ---
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
                callback: () => {
                    // This command will not work unless 'tn-ZA' is added to the LANGUAGES object above.
                    // If you add it, uncomment the line in LANGUAGES.
                    if (LANGUAGES['tn-ZA']) {
                        switchLanguage('tn-ZA');
                    } else {
                        speakText("Setswana language support is not fully configured or not supported by your browser.");
                    }
                }
            },
            {
                command: 'Speak in Setswana', // Alternative command
                callback: () => {
                    if (LANGUAGES['tn-ZA']) {
                        switchLanguage('tn-ZA');
                    } else {
                        speakText("Setswana language support is not fully configured or not supported by your browser.");
                    }
                }
            }
            // --- End Language Switching Commands ---
        ]
    });

    // Effect to manage initial listening state and re-activate after language switch
    useEffect(() => {
        // Start listening initially when component mounts if not already active
        if (!listening && !isListeningActive) {
            SpeechRecognition.startListening({ continuous: true, lang: currentLang });
            setIsListeningActive(true);
        }
        // If language changes and not listening, restart listening
        if (!listening && isListeningActive && SpeechRecognition.browserSupportsSpeechRecognition) {
            SpeechRecognition.startListening({ continuous: true, lang: currentLang });
        }
    }, [listening, currentLang, isListeningActive]); // Depend on listening, currentLang, and internal active state

    // Synchronize internal listening state with useSpeechRecognition's 'listening'
    // This handles cases where useSpeechRecognition might stop listening internally (e.g., due to silence)
    useEffect(() => {
        if (listening) {
            setIsListeningActive(true);
        } else {
            // If listening stops unexpectedly, set internal state to false
            setIsListeningActive(false);
        }
    }, [listening]);


    if (!browserSupportsSpeechRecognition) {
        return <span className="voice-command-unsupported">Your browser does not support speech recognition. Please use Chrome, Firefox, or Edge.</span>;
    }

    return (
        <div className="voice-command">
            <p>{isListeningActive ? 'Listening...' : 'Not listening'}</p>
            <p><em>{transcript}</em></p>
        </div>
    );
}

export default VoiceCommand;