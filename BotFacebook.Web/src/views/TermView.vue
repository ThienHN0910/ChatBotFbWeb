<script setup lang="ts">
const sections = [
  {
    title: '1. Chấp nhận điều khoản',
    copy: 'Khi sử dụng DNE Trùm Động Bot ("Bot"), bạn đồng ý tuân thủ các Điều khoản Dịch vụ này.',
  },
  {
    title: '2. Nội dung do người dùng tạo',
    copy: 'Bạn chịu trách nhiệm về nội dung tin nhắn gửi cho Bot. Bot không chịu trách nhiệm với bất kỳ nội dung do AI sinh ra dựa trên thông tin bạn cung cấp.',
  },
  {
    title: '3. Mục đích sử dụng',
    copy: 'Bot được thiết kế để cung cấp thông tin và giải trí. Chúng tôi không đảm bảo tính chính xác tuyệt đối của câu trả lời.',
  },
  {
    title: '4. Thay đổi dịch vụ',
    copy: 'Chúng tôi có quyền thay đổi hoặc ngừng hoạt động của Bot bất cứ lúc nào mà không cần báo trước.',
  },
]
</script>

<template>
  <section class="term-shell legal-shell">
    <header class="legal-hero">
      <div class="hero-kicker">Terms of Service</div>
      <h1 class="legal-title">Terms of Service cho DNE Trùm Động Bot</h1>
      <p class="legal-copy">Cập nhật lần cuối: 11/05/2026</p>

      <div class="page-actions">
        <RouterLink class="primary-button" to="/dashboard">Quay lại dashboard</RouterLink>
        <RouterLink class="secondary-button" to="/policy">Xem policy</RouterLink>
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