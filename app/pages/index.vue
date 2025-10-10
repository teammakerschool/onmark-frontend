<template>
  <div class="main-page">
    <Navbar />
    
    <div class="hero-section">
      <div class="container">
        <h1 class="main-title">OnMark</h1>
        <p class="main-subtitle">
          사진에 비가시성 워터마크를 적용하여 안전하게 보호하는 클라우드 서비스
        </p>
        
        <div class="hero-buttons">
          <NuxtLink to="/signup" class="btn btn-primary btn-large">
            <RocketLaunchIcon class="icon" />
            시작하기
          </NuxtLink>
          <NuxtLink to="/login" class="btn btn-secondary btn-large">
            <ArrowRightCircleIcon class="icon" />
            로그인
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="features-section">
      <div class="container">
        <h2 class="section-title">왜 OnMark를 선택해야 하나요?</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <ShieldCheckIcon class="feature-icon" />
            </div>
            <h3 class="feature-title">안전한 보호</h3>
            <p class="feature-description">
              비가시성 워터마크 기술로 사진의 저작권을 보호하고, 
              무단 사용을 방지합니다.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <CloudArrowUpIcon class="feature-icon" />
            </div>
            <h3 class="feature-title">클라우드 저장</h3>
            <p class="feature-description">
              안전한 클라우드 스토리지에 사진을 보관하고,
              언제 어디서나 접근 가능합니다.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <BoltIcon class="feature-icon" />
            </div>
            <h3 class="feature-title">빠른 처리</h3>
            <p class="feature-description">
              업로드와 동시에 워터마크가 적용되며,
              즉시 다운로드하여 사용할 수 있습니다.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <UserCircleIcon class="feature-icon" />
            </div>
            <h3 class="feature-title">개인 맞춤</h3>
            <p class="feature-description">
              개인 계정으로 사진을 관리하고,
              필요할 때 언제든 다운로드하세요.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <CursorArrowRaysIcon class="feature-icon" />
            </div>
            <h3 class="feature-title">간편한 사용</h3>
            <p class="feature-description">
              복잡한 설정 없이 드래그 앤 드롭만으로
              간편하게 사진을 보호할 수 있습니다.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <SparklesIcon class="feature-icon" />
            </div>
            <h3 class="feature-title">무료 서비스</h3>
            <p class="feature-description">
              모든 기능을 무료로 사용할 수 있으며,
              제한 없이 사진을 업로드하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ShieldCheckIcon, 
  CloudArrowUpIcon, 
  BoltIcon,
  UserCircleIcon,
  CursorArrowRaysIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ArrowRightCircleIcon
} from '@heroicons/vue/24/outline'
</script>

<style scoped>
.main-page {
  background: #0a0a0a;
  min-height: 100vh;
}

.hero-section {
  padding: 120px 0 100px;
  text-align: center;
}

.main-title {
  font-size: 72px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  letter-spacing: -2px;
}

.main-subtitle {
  font-size: 20px;
  color: #999;
  max-width: 700px;
  margin: 0 auto 48px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-large {
  padding: 16px 32px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 20px;
  height: 20px;
}

.features-section {
  padding: 80px 0 120px;
}

.section-title {
  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin-bottom: 64px;
  letter-spacing: -1px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.feature-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 40px 32px;
  transition: all 0.3s;
}

.feature-card:hover {
  background: #222;
  border-color: #3a3a3a;
  transform: translateY(-4px);
}

.feature-icon-wrapper {
  margin-bottom: 24px;
}

.feature-icon {
  width: 48px;
  height: 48px;
  color: #ffffff;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
}

.feature-description {
  font-size: 15px;
  color: #999;
  line-height: 1.6;
}
</style>