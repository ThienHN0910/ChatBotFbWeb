<script setup lang="ts">
const sections = [
  {
    title: '1. Thông tin chúng tôi thu thập',
    copy: 'Bot thu thập ID Facebook (PSID), tên và nội dung tin nhắn bạn gửi đến fanpage để phục vụ tính năng trả lời tự động và thống kê.',
  },
  {
    title: '2. Cách chúng tôi sử dụng thông tin',
    copy: 'Thông tin thu thập được dùng để tìm kiếm nội dung trả lời phù hợp (qua hệ thống RAG) và phân tích lịch sử trò chuyện.',
  },
  {
    title: '3. Bảo mật dữ liệu',
    copy: 'Chúng tôi không chia sẻ dữ liệu của bạn cho bên thứ ba, trừ trường hợp gửi nội dung cho API mô hình ngôn ngữ (Google Gemini) để tạo câu trả lời.',
  },
  {
    title: '4. Liên hệ',
    copy: 'Nếu bạn có thắc mắc về chính sách này, vui lòng liên hệ trực tiếp qua fanpage.',
  },
]
</script>

<template>
  <section class="policy-shell legal-shell">
    <header class="legal-hero">
      <div class="hero-kicker">Privacy Policy</div>
      <h1 class="legal-title">Privacy Policy cho DNE Trùm Động Bot</h1>
      <p class="legal-copy">Cập nhật lần cuối: 11/05/2026</p>

      <div class="page-actions">
        <RouterLink class="primary-button" to="/dashboard">Quay lại dashboard</RouterLink>
        <RouterLink class="secondary-button" to="/term">Xem term</RouterLink>
      </div>
    </header>

    <div class="legal-grid">
      <article v-for="section in sections" :key="section.title" class="legal-card">
        <h2 class="card-title">{{ section.title }}</h2>
        <p class="card-copy">{{ section.copy }}</p>
      </article>
    </div>
  </section>
</template>