document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());


    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }


    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 9) value = value.slice(0, 9);

        const matches = value.match(/(\d{1,3})/g);
        if (matches) {
            e.target.value = matches.join(' ');
        }
    });

    console.log('Form data:', data);

});