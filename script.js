document.addEventListener("DOMContentLoaded", () => {
    const cards = [3, 8, 12, 20, 7, 5, 14, 18, 21, 46, 24, 53, 24, 32];  // Danh sách các số trên thẻ
    let target = 0;  // Số cần tìm
    let found = false;  // Cờ kiểm tra xem số đã được tìm thấy hay chưa
    let flips = 0;  // Đếm số lần lật thẻ
    let currentIndex = 0;  // Chỉ số của thẻ hiện tại có thể lật
    const cardsContainer = document.getElementById('cards-container');
    const resultElement1 = document.getElementById('result1');
    const resultElement2 = document.getElementById('result2');
    const resultElement3 = document.getElementById('result3');
    const resetButton = document.getElementById('reset');
    const input = document.getElementById('input');
    const set_target = document.getElementById('set_target');
    const target_p = document.getElementById('target_p');

    set_target.addEventListener("click", () => {
        const inputValue = input.value;
    
        // Kiểm tra nếu ô input rỗng hoặc không phải số
        if (!inputValue || isNaN(inputValue)) {
            alert("Vui lòng nhập một số hợp lệ!");
            return; // Ngăn không cho thực hiện tiếp nếu chưa nhập số
        }
    
        target = Number(input.value);  // Chuyển giá trị input thành số
        target_p.textContent = `Số cần tìm là: ${target}`;
        resetGame();  // Reset trò chơi khi nhập số mới
    });

    // Hàm reset toàn bộ trò chơi
    function resetGame() {
        found = false;  // Đặt lại cờ `found`
        flips = 0;  // Đặt lại số lần lật thẻ
        currentIndex = 0;  // Đặt lại chỉ số thẻ hiện tại
        resultElement1.textContent = '';  // Xóa kết quả cũ
        resultElement2.textContent = ''; 
        resultElement3.textContent = '';
        cardsContainer.innerHTML = '';  // Xóa các thẻ cũ
        initializeGame();  // Tạo lại các thẻ
    }

    // Gán giá trị target khi bấm nút "Set Target"
    set_target.addEventListener("click", () => {
        target = Number(input.value);  // Chuyển giá trị input thành số
        target_p.textContent = `Số cần tìm là: ${target}`;
        resetGame();  // Reset trò chơi khi nhập số mới
    });

    function createCard(value, index) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        const frontFace = document.createElement('div');
        frontFace.classList.add('front');
        frontFace.textContent = "?";  // Mặt trước của thẻ, ban đầu ẩn số
        
        const backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.textContent = value;  // Mặt sau của thẻ, hiển thị số
        
        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        // Sự kiện click vào thẻ để lật thẻ và kiểm tra số
        cardElement.addEventListener('click', () => {
            if (isNaN(target) || target === 0) {  // Kiểm tra nếu chưa nhập số hợp lệ
                alert("Vui lòng nhập số cần tìm trước khi lật thẻ!");
                return;
            }
    
            if (found || index !== currentIndex) return;  // Chỉ cho phép lật thẻ theo thứ tự
    
            cardElement.classList.add('flipped');  // Lật thẻ khi người dùng click
            flips++;  // Tăng số lần lật thẻ
    
            if (value === target) {
                resultElement1.textContent = `Đã tìm thấy ${target}!`;
                resultElement2.textContent = `Vị trí: ${index + 1}`;
                resultElement3.textContent = `Số lần lật thẻ: ${flips}`;
                found = true;  // Đặt cờ `found` thành true khi tìm thấy số
                setTimeout(resetGame, 5000);  // Reset sau 5 giây
            } else {
                resultElement1.textContent = `Số ${target} không có ở vị trí này.`;
                resultElement2.textContent = `Số lần lật thẻ: ${flips}.`;
                currentIndex++;  // Tăng chỉ số để cho phép lật thẻ tiếp theo
            }
            // Nếu đã duyệt qua tất cả các thẻ mà không tìm thấy số
            if (!found && currentIndex === cards.length) {
                resultElement1.textContent = `Không tìm thấy số ${target} trong danh sách!`;
                setTimeout(resetGame, 5000);  // Reset sau 2 giây
            }
        });

        return cardElement;
    }

    function initializeGame() {
        cardsContainer.innerHTML = '';  // Xóa thẻ trước khi khởi động lại
        resultElement1.textContent = '';  // Xóa nội dung kết quả
        cards.forEach((card, index) => {
            const cardElement = createCard(card, index);
            cardsContainer.appendChild(cardElement);
        });
    }

    resetButton.addEventListener('click', resetGame);
    set_target.addEventListener('click', resetGame);

    // Khởi động trò chơi ban đầu
    initializeGame();
});
