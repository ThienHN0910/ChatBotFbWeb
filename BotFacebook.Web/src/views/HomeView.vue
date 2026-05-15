<script setup lang="ts">
import { getAuthUrl } from '../services/api'

const commandCards = [
  {
    command: '/ask <question>',
    aliases: [],
    description: 'Hỏi Gemini với ngữ cảnh dữ liệu đã lưu.',
  },
  {
    command: '/weather [day] [location]',
    aliases: [],
    description: 'Xem thời tiết hôm nay hoặc tối đa 5 ngày tới (mặc định Đà Nẵng).',
  },
  {
    command: '/pick [-n <số lượng>] -l item1; item2; item3',
    aliases: [],
    description: 'Chọn ngẫu nhiên 1 hoặc nhiều mục trong danh sách ngăn cách bằng dấu ;.',
  },
  {
    command: '/random',
    aliases: [],
    description: 'Sinh tỉ lệ ngẫu nhiên hoặc số trong khoảng /random <min> <max>.',
  },
  {
    command: '/time',
    aliases: ['/gio', '/keo'],
    description: 'Trả về giờ hệ thống theo múi giờ bot.',
  },
  {
    command: '/uptime',
    aliases: ['/up'],
    description: 'Hiển thị thời gian bot đã chạy.',
  },
  {
    command: '/ping',
    aliases: [],
    description: 'Kiểm tra phản hồi và độ trễ cơ bản của bot.',
  },
  {
    command: '/echo <text>',
    aliases: ['/say'],
    description: 'Bot nhại lại nội dung bạn gửi.',
  },
  {
    command: '/about',
    aliases: ['/info'],
    description: 'Thông tin nhanh về bot và hệ thống.',
  },
  {
    command: '/fb, /link',
    aliases: [],
    description: 'Trả về các liên kết cộng đồng (group/page/discord/website).',
  },
  {
    command: '/me',
    aliases: [],
    description: 'Hiển thị tên Facebook và ID của người gửi.',
  },
  {
    command: '/mem',
    aliases: [],
    description: 'Thống kê số người đã nhắn bot.',
  },
  {
    command: '/top',
    aliases: [],
    description: 'Top người gửi tin nhắn nhiều nhất.',
  },
  {
    command: '/history',
    aliases: [],
    description: 'Lịch sử 10 tin nhắn gần nhất của bạn.',
  },
  {
    command: '/help',
    aliases: ['/h'],
    description: 'Hiển thị danh sách lệnh hỗ trợ.',
  },
]

const featureCards = [
  {
    title: 'Admin dashboard',
    copy: 'Quản lý knowledge base, user được phép truy cập và điều hướng login bằng Google qua backend Node.',
  },
  {
    title: 'Bot commands',
    copy: 'Bot đã có nhóm lệnh AI, thời tiết, random/pick, social links và lệnh thống kê vận hành.',
  },
  {
    title: 'Public routes',
    copy: 'Có đầy đủ page /policy và /term theo đúng nội dung cũ, nhưng được render bằng Vue 3 và lazy load theo route.',
  },
]

const loginUrl = getAuthUrl()
</script>

<template>
  <section class="page-grid hero-grid">
    <article class="hero-card">
      <div class="hero-kicker">Vue 3 frontend · Node backend</div>
      <h1 class="hero-title">Control panel cho BotFacebook, gọn hơn và khớp với runtime hiện tại.</h1>
      <p class="hero-copy">
        Frontend này làm việc trực tiếp với backend Node: dashboard, policy, term và các hành động
        CRUD đều gọi sang BotFacebook Node qua fetch với cookie session.
      </p>

      <div class="hero-actions">
        <a class="primary-button" :href="loginUrl">Login với Google</a>
        <RouterLink class="secondary-button" to="/dashboard">Mở dashboard</RouterLink>
        <RouterLink class="ghost-button" to="/policy">Xem policy</RouterLink>
      </div>
    </article>

    <aside class="hero-side">
      <div class="panel">
        <h2 class="section-title">Bot commands</h2>
        <p class="section-copy">Danh sách lệnh đang active trên backend Node, kèm mô tả nhanh cho từng lệnh.</p>

        <div class="command-grid" style="margin-top: 18px">
          <div v-for="item in commandCards" :key="item.command" class="command-card">
            <div class="keywords" style="margin-bottom: 8px">
              <span class="command-pill">{{ item.command }}</span>
              <span v-for="alias in item.aliases" :key="alias" class="command-pill">{{ alias }}</span>
            </div>
            <p class="card-copy" style="margin: 0">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <p class="stat-number">Vue 3</p>
          <p class="stat-label">SPA route-driven UI</p>
        </div>
        <div class="stat-card">
          <p class="stat-number">Lazy load</p>
          <p class="stat-label">Route components được tải khi cần</p>
        </div>
      </div>
    </aside>
  </section>

  <section class="panel" style="margin-top: 24px">
    <div class="dashboard-toolbar">
      <div>
        <h2 class="section-title">What changed</h2>
        <p class="section-copy">Ba mảng chính: admin, public pages, và bot integration.</p>
      </div>
      <RouterLink class="ghost-button" to="/term">Đi tới term</RouterLink>
    </div>

    <div class="feature-grid" style="margin-top: 18px">
      <article v-for="card in featureCards" :key="card.title" class="feature-card">
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-copy">{{ card.copy }}</p>
      </article>
    </div>
  </section>
</template>