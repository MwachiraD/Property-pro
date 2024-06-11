document.addEventListener('DOMContentLoaded', function () {
    const chatButton = document.querySelector('.chat-button');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.querySelector('.close-chat');

    chatButton.addEventListener('click', function () {
        chatBox.style.display = 'flex';
    });

    closeChat.addEventListener('click', function () {
        chatBox.style.display = 'none';
    });
});
window.openPaymentForm = function(planName, price) {
    planNameElement.textContent = planName + " - $" + (price / 100);
    planPrice = price;
    paymentFormContainer.style.display = 'block';
    window.scrollTo(0, 0); // Scroll to the top to make the form visible
}

