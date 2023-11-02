import {ref, computed} from 'vue'

export const collapsed  = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH: number = 180
export const SIDEBAR_WIDTH_COLLAPSED : number = 38
export const sidebarWidth = computed(
    () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)