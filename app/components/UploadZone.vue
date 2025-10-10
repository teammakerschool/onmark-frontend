<template>
  <div 
    class="upload-zone"
    :class="{ 'dragging': isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <input 
      type="file" 
      ref="fileInput" 
      @change="handleFileSelect"
      accept="image/*"
      style="display: none"
    >

    <div class="upload-content">
      <div class="upload-icon-wrapper">
        <CloudArrowUpIcon class="upload-icon" />
      </div>
      <h3>사진을 업로드하세요</h3>
      <p>드래그 앤 드롭 또는 클릭하여 선택</p>
      <button @click="$refs.fileInput.click()" class="btn btn-primary">
        <PhotoIcon class="btn-icon" />
        파일 선택
      </button>
      
      <div v-if="selectedFile" class="selected-file">
        <DocumentCheckIcon class="file-icon" />
        <div class="file-info">
          <p class="file-name">{{ selectedFile.name }}</p>
          <button @click="uploadFile" class="btn btn-primary btn-upload">
            <ArrowUpTrayIcon class="btn-icon" />
            업로드 시작
          </button>
        </div>
      </div>

      <div v-if="uploading" class="upload-progress">
        <div class="spinner"></div>
        <p>워터마크 적용 중...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  CloudArrowUpIcon, 
  PhotoIcon,
  DocumentCheckIcon,
  ArrowUpTrayIcon
} from '@heroicons/vue/24/outline'

const emit = defineEmits(['upload-success'])

const fileInput = ref(null)
const selectedFile = ref(null)
const isDragging = ref(false)
const uploading = ref(false)

const config = useRuntimeConfig()

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
  } else {
    alert('이미지 파일만 업로드 가능합니다')
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
  } else {
    alert('이미지 파일만 업로드 가능합니다')
  }
}

const uploadFile = async () => {
  if (!selectedFile.value) return

  uploading.value = true

  const formData = new FormData()
  formData.append('photo', selectedFile.value)

  const token = localStorage.getItem('token')

  try {
    const response = await fetch(`${config.public.apiBase}/api/photos/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || '업로드 실패')
      uploading.value = false
      return
    }

    alert('✅ 워터마크가 적용되어 업로드되었습니다!')
    selectedFile.value = null
    fileInput.value.value = ''
    uploading.value = false
    
    emit('upload-success')
  } catch (error) {
    alert('서버 연결에 실패했습니다')
    uploading.value = false
  }
}
</script>

<style scoped>
.upload-zone {
  border: 3px dashed #333;
  border-radius: 12px;
  padding: 60px 40px;
  text-align: center;
  background: #1a1a1a;
  transition: all 0.3s;
  cursor: pointer;
}

.upload-zone.dragging {
  border-color: #555;
  background: #222;
}

.upload-content {
  pointer-events: none;
}

.upload-content button {
  pointer-events: all;
}

.upload-icon-wrapper {
  margin-bottom: 24px;
}

.upload-icon {
  width: 64px;
  height: 64px;
  color: #999;
  margin: 0 auto;
}

.upload-zone h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #ffffff;
}

.upload-zone p {
  color: #999;
  margin-bottom: 24px;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.selected-file {
  margin-top: 24px;
  padding: 20px;
  background: #0a0a0a;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  gap: 16px;
}

.file-icon {
  width: 40px;
  height: 40px;
  color: #22c55e;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  text-align: left;
}

.file-name {
  margin-bottom: 12px;
  color: #ffffff;
  font-weight: 500;
}

.btn-upload {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.upload-progress {
  margin-top: 24px;
  padding: 20px;
  background: #0a0a0a;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  border: 4px solid #333;
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>