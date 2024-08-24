document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const backToStartButton = document.getElementById('back-to-start-button');

    let currentState = 'initial';
    let previousState = null;
    let currentCategoryId = null;

    showCategories();

    sendButton.addEventListener('click', () => {
        handleUserInput();
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleUserInput();
        }
    });

    backToStartButton.addEventListener('click', () => {
        resetChat();
    });

    function handleUserInput() {
        const input = userInput.value.trim();
        userInput.value = '';
        if (isNaN(input) || input === '') {
            appendMessage('Chatbot: Por favor, insira um número válido.');
            return;
        }
        handleInput(Number(input));
    }

    function handleInput(input) {
        clearChatLog();

        if (input === 0) {
            if (currentState === 'categories' || currentState === 'questions') {
                currentState = previousState || 'initial';
                showState();
            } else {
                resetChat();
            }
        } else {
            switch (currentState) {
                case 'initial':
                    appendMessage('Chatbot: Opção inválida. Digite 0 para ver as categorias.');
                    break;
                case 'categories':
                    handleCategorySelection(input);
                    break;
                case 'questions':
                    handleQuestionSelection(input);
                    break;
                default:
                    appendMessage('Chatbot: Opção inválida. Digite 0 para voltar ao início.');
            }
        }
    }

    function clearChatLog() {
        chatLog.innerHTML = '';
    }

    function showCategories() {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    appendMessage('Chatbot: Escolha uma categoria (digite o número):');
                    data.forEach((category, index) => {
                        appendMessage(`${index + 1}: ${category.category_name}`);
                    });
                    appendMessage('Digite 0 para voltar ao início.');
                    previousState = 'initial';
                    currentState = 'categories';
                } else {
                    appendMessage('Chatbot: Nenhuma categoria encontrada.');
                }
            })
            .catch(error => {
                appendMessage('Chatbot: Ocorreu um erro ao buscar as categorias.');
            });
    }

    function handleCategorySelection(selection) {
        fetch(`/api/questions/${selection}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    appendMessage('Chatbot: Escolha uma pergunta (digite o número):');
                    data.forEach((question, index) => {
                        appendMessage(`${index + 1}: ${question.question_text}`);
                    });
                    appendMessage('Digite 0 para voltar ao início.');
                    previousState = 'categories';
                    currentCategoryId = selection;
                    currentState = 'questions';
                } else {
                    appendMessage('Chatbot: Nenhuma pergunta encontrada para esta categoria.');
                    showCategories();
                }
            })
            .catch(error => {
                appendMessage('Chatbot: Ocorreu um erro ao buscar as perguntas.');
            });
    }

    function handleQuestionSelection(selection) {
        fetch(`/api/questions/${currentCategoryId}`)
            .then(response => response.json())
            .then(data => {
                const question = data[selection - 1];
                if (question) {
                    appendMessage(`Chatbot: ${question.answer_text}`);
                } else {
                    appendMessage('Chatbot: Pergunta inválida.');
                }
                appendMessage('Digite 0 para voltar ao início.');
                previousState = 'questions';
                currentState = 'initial';
            })
            .catch(error => {
                appendMessage('Chatbot: Ocorreu um erro ao buscar a resposta.');
            });
    }

    function resetChat() {
        clearChatLog();
        showCategories();
        previousState = null;
        currentState = 'initial';
    }

    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }
});
