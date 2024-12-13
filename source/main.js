function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".container > div");
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    const menuBtn = document.getElementById("menuBtn"); // 'menuBtn'로 변경
    const sidebar = document.getElementById("sidebar");
    let currentSectionIndex = 0;
    let isScrolling = false;

    // 햄버거 버튼 클릭 이벤트
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active"); // 사이드바 활성화/비활성화
    });

    // Intersection Observer 설정
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                const sidebarLink = document.querySelector(`.sidebar a[href="#${id}"]`);
                sidebarLinks.forEach((link) => link.classList.remove("active"));
                sidebarLink.classList.add("active");
                currentSectionIndex = Array.from(sections).indexOf(entry.target);
            }
        });
    }, { threshold: 0.8 });

    sections.forEach((section) => observer.observe(section));

    // 부드러운 섹션 이동
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isScrolling) return;

        isScrolling = true;
        sections[index].scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setTimeout(() => (isScrolling = false), 1000);
    }

    // 스크롤 이벤트에 debounce 적용 (스크롤 민감도 감소)
    const handleWheel = debounce((event) => {
        if (event.deltaY > 0) {
            scrollToSection(currentSectionIndex + 1);
        } else {
            scrollToSection(currentSectionIndex - 1);
        }
    }, 30); // 150ms 후에만 실행되도록 설정 (조정 가능)

    // 마우스 휠 이벤트
    window.addEventListener("wheel", handleWheel);

    // 키보드 이벤트
    window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.key === "ArrowUp") {
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // 사이드바 메뉴 클릭 이벤트
    sidebarLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            currentSectionIndex = Array.from(sections).indexOf(targetSection);

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });
});

//메인페이지 뒤에 초록창 함수
// 메시지 생성 함수
document.addEventListener('DOMContentLoaded', () => {
    function createFloatingMessage() {
        const container = document.querySelector('.floating-messages');

        if (!container) {
            console.error('Floating messages container not found!');
            return;
        }

        // 메시지 박스 생성
        const message = document.createElement('div');
        message.classList.add('floating-message');
        message.textContent = getRandomMessage();

        // 랜덤 위치와 크기 설정
        const x = Math.random() * 90; // 화면 가로 랜덤 위치 (10% 여유)
        const y = Math.random() * 90; // 화면 세로 랜덤 위치 (10% 여유)
        const size = Math.random() * 1.5 + 0.5; // 크기 랜덤 설정 (0.5배 ~ 2배)

        message.style.left = `${x}%`;
        message.style.top = `${y}%`;
        message.style.transform = `scale(${size})`;

        // 메시지를 컨테이너에 추가
        container.appendChild(message);

        // 메시지를 일정 시간 후 제거
        setTimeout(() => {
            if (message.parentNode) {
                container.removeChild(message);
            }
        }, 2000); // 애니메이션과 일치 (2초)
    }

    function getRandomMessage() {
        const messages = [
                "안녕하세요!",
                "환영합니다!",
                "즐거운 하루 되세요!",
                "오신 걸 환영합니다!",
                "재밌게 꾸미려고 애쓰고 있습니다!!",
                "마라탕 먹고 싶습니다!",
                "/r 1d20",
                "빨리 취직하고 싶어요",
                "사이버펑크 너무 좋아해요",
                "미니어처 만드는 거 좋아해요",
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // 메시지 생성 주기 설정
    setInterval(createFloatingMessage, 500); //
});


//프로필 이미지 기울이기
document.addEventListener('mousemove', (e) => {
    const profilePhoto = document.querySelector('.profilePhoto img');

    // 마우스 위치에 따른 기울기 계산
     const mouseX = (e.clientX / window.innerWidth) - 0.5;  // -0.5 ~ 0.5 사이 값
    const mouseY = (e.clientY / window.innerHeight) - 0.5; // -0.5 ~ 0.5 사이 값

    // 기울기 효과 (X, Y, Z 축에 따라 회전 효과)
    profilePhoto.style.transform = `rotateY(${mouseX * 50}deg) rotateX(${mouseY * -50}deg)`;
});


// 기술 카드 클릭 시 선택 효과 추가
document.querySelectorAll('.techlist').forEach(techCard => {
    techCard.addEventListener('click', (event) => {
        // 이미 선택된 카드가 있으면 선택 해제
        document.querySelectorAll('.techlist').forEach(card => card.classList.remove('selected'));

        // 클릭한 카드 선택
        techCard.classList.add('selected');
        event.stopPropagation();  // 클릭 이벤트 전파 방지 (배경 클릭 시 이벤트 전파 방지)
    });
});

// 창 이외의 부분 클릭 시 선택 해제
document.body.addEventListener('click', () => {
    document.querySelectorAll('.techlist').forEach(card => card.classList.remove('selected'));
});


// 이미지 클릭 시 회전 효과
let angle = 0;

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        angle += 90; // 클릭 시 90도씩 회전
        document.querySelector('.portfolio-container').style.transform = `rotateY(${angle}deg)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fakeProfileContainer = document.querySelector('.fake-profile-container');

    // 가짜 프로필을 생성하는 함수
    function createFakeProfile() {
        const fakeProfile = document.createElement('div');
        fakeProfile.classList.add('fake-profile');
        
        // 프로필 사진 (배경 이미지로 설정)
        const profileImage = document.createElement('div');
        profileImage.classList.add('profile-image');
        profileImage.style.backgroundImage = `url('https://placeimg.com/200/200/people')`; // 임의의 프로필 이미지
        
        // 프로필 정보
        const profileInfo = document.createElement('div');
        profileInfo.classList.add('profile-info');
        
        const profileName = document.createElement('div');
        profileName.classList.add('profile-name');
        profileName.textContent = `■■■■■■■■`;  // 이름
        
        const profileJob = document.createElement('div');
        profileJob.classList.add('profile-job');
        profileJob.textContent = `■■■■■■■■■■■■`;  // 직업
        
        const profileBio = document.createElement('div');
        profileBio.classList.add('profile-bio');
        profileBio.textContent = `■■■■■■■■■■■■■■■■, ■■■■■■■■, ■■■■■■ ■■■■, ■■■■■■!`;  // 간단한 소개
        
        // 프로필 정보 추가
        profileInfo.appendChild(profileName);
        profileInfo.appendChild(profileJob);
        profileInfo.appendChild(profileBio);

        // 프로필에 이미지와 정보 추가
        fakeProfile.appendChild(profileImage);
        fakeProfile.appendChild(profileInfo);

        // 랜덤한 위치와 크기 설정
        const xPosition = Math.random() * 100; // 화면의 0~100% 가로 위치
        const delay = Math.random() * 5 + 1; // 1초에서 6초 사이 랜덤 시간
        const size = Math.random() * 1.5 + 0.5; // 랜덤 크기 (0.5배 ~ 2배)

        // 프로필의 시작 위치 설정
         fakeProfile.style.left = `${xPosition}%`;
        fakeProfile.style.animationDelay = `-${delay}s`; // 애니메이션 시작 지연

        fakeProfileContainer.appendChild(fakeProfile);

        // 애니메이션이 끝난 후 프로필 제거
        setTimeout(() => {
            fakeProfile.remove();
        }, (delay + 5) * 1000); // 애니메이션이 끝난 후 5초 뒤에 제거
    }

    // 일정 간격으로 가짜 프로필 생성
    setInterval(createFakeProfile, 1000); // 1초마다 새로운 프로필 생성
});



