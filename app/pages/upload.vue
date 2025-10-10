<template>
  <div>
    <Navbar />
    
    <div class="upload-page">
      <div class="container">
        <h1>사진 업로드</h1>
        <p class="page-subtitle">워터마크를 적용하여 안전하게 보관하세요</p>

        <UploadZone @upload-success="handleUploadSuccess" />

        <div class="recent-uploads" v-if="recentPhotos.length > 0">
          <h2>최근 업로드</h2>
          <div class="photos-grid">
            <PhotoCard 
              v-for="photo in recentPhotos" 
              :key="photo.id"
              :photo="photo"
              @download="downloadPhoto"
              @delete="deletePhoto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const router = useRouter()

const recentPhotos = ref([])

// 로그인 확인
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('로그인이 필요합니다')
    router.push('/login')
    return
  }
  
  fetchRecentPhotos()
})

// 최근 사진 가져오기
const fetchRecentPhotos = async () => {
  const token = localStorage.getItem('token')
  
  try {
    const response = await fetch(`${config.public.apiBase}/api/photos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    recentPhotos.value = data.photos.slice(0, 3) // 최근 3개만
  } catch (error) {
    console.error('사진 목록 조회 실패:', error)
  }
}

// 업로드 성공 후
const handleUploadSuccess = () => {
  fetchRecentPhotos()
}

// 다운로드
const downloadPhoto = async (photo) => {
  const token = localStorage.getItem('token')
  
  try {
    const response = await fetch(
      `${config.public.apiBase}/api/photos/${photo.id}/download`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      alert('다운로드 실패')
      return
    }

    // Blob으로 변환
    const blob = await response.blob()
    
    // 다운로드 링크 생성
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = photo.original_filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    alert('다운로드 실패')
    console.error(error)
  }
}

// 삭제
const deletePhoto = async (photoId) => {
  const token = localStorage.getItem('token')
  
  try {
    const response = await fetch(`${config.public.apiBase}/api/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      alert('사진이 삭제되었습니다')
      fetchRecentPhotos()
    }
  } catch (error) {
    alert('삭제 실패')
  }
}
</script>

<style scoped>
.upload-page {
  min-height: calc(100vh - 80px);
  padding: 40px 0;
}

.upload-page h1 {
  font-size: 36px;
  margin-bottom: 8px;
  color: #1F2937;
}

.page-subtitle {
  color: #6B7280;
  margin-bottom: 40px;
  font-size: 18px;
}

.recent-uploads {
  margin-top: 60px;
}

.recent-uploads h2 {
  font-size: 28px;
  margin-bottom: 24px;
  color: #1F2937;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
</style>