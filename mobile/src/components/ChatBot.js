// ChatBot component with simple RAG API integration
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

// System prompt defining the virtual restaurant assistant behavior
const SYSTEM_PROMPT = `You are a friendly restaurant virtual assistant for "Restaurant Casablanca".

Your role:
- Welcome customers in both French and simple English.
- Speak in a warm, polite and professional tone.
- Help customers choose items from the menu.
- Ask questions step-by-step to understand their order.
- Confirm the order clearly.
- Calculate and display the total price.
- Ask for delivery or pickup.
- Ask for necessary information (name, phone number, address if delivery).
- At the end, ask if they need anything else.

Rules:
- Always start with a bilingual greeting (French + English).
- Keep sentences simple and clear.
- When the customer orders items, summarize the order before giving the total.
- Show prices clearly.
- Display total like this: TOTAL: XX MAD
- If something is unclear, ask politely for clarification.
- If delivery, ask for full address.
- If pickup, ask for preferred time.

Example tone:

🇫🇷 Bonjour et bienvenue chez Casablanca Smille !
🇬🇧 Hello and welcome to Casablanca Smille!

Comment puis-je vous aider aujourd'hui ?
How can I help you today?

(Then continue conversation naturally.)

At the end say:
Merci pour votre commande / Thank you for your order!`;


// Replace with your actual RAG endpoint URL
const RAG_ENDPOINT = 'https://your-rag-api.example.com/query';

const ChatBot = () => {
    const [messages, setMessages] = useState([]); // {role: 'user'|'bot', text: string}
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const addMessage = (role, text) => {
        setMessages(prev => [...prev, { role, text }]);
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = input.trim();
        addMessage('user', userMessage);
        setInput('');
        setLoading(true);
        try {
            const response = await axios.post(RAG_ENDPOINT, { query: userMessage });
            const botReply = response.data?.answer || 'No response';
            addMessage('bot', botReply);
        } catch (e) {
            console.error('ChatBot error:', e);
            addMessage('bot', 'Sorry, an error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageBubble, item.role === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.messageList}
            />
            {loading && <ActivityIndicator size="small" color="#E54B4B" style={styles.loader} />}
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Posez votre question..."
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={handleSend}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Envoyer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    },
    messageList: {
        paddingBottom: 8,
    },
    messageBubble: {
        marginVertical: 4,
        padding: 10,
        borderRadius: 8,
        maxWidth: '80%',
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#E54B4B',
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#F0F0F0',
    },
    messageText: {
        color: '#000',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 8,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#E54B4B',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    loader: {
        marginVertical: 4,
    },
});

export default ChatBot;
