import React, { useState } from 'react';
import axios from 'axios';

const TranslateSubtitle = ({ subtitleText }) => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('en');
    const [error, setError] = useState('');

    const translateText = async () => {
        setError('');
        setTranslatedText('');
        
        try {
        console.log('Sending request to Laravel backend...');
        const response = await axios.post('/api/translate', {
            text: inputText,
            targetLanguage: targetLanguage,
        });
        console.log('Response received:', response.data);
        setTranslatedText(response.data.translations[0].text);
        } catch (error) {
        console.error('Translation error:', error);
        setError(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Yandex Translate</h2>
            <textarea
                className="w-full p-2 border rounded"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate"
                rows={4}
            />
            <select
                className="mt-2 p-2 border rounded"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
            >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
            </select>
            <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={translateText}
            >
                Translate
            </button>
            {error && (
                <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
                </div>
            )}
            {translatedText && (
                <div className="mt-4">
                <h3 className="text-xl font-semibold">Translated Text:</h3>
                <p className="mt-2 p-2 border rounded">{translatedText}</p>
                </div>
            )}
        </div>
    );
};

export default TranslateSubtitle;
