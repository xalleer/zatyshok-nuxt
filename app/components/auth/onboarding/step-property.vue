<script setup lang="ts">

import {useForm} from "vee-validate";
import {authPropertySchema} from "~/validators/auth";
import {getSlug, getPublicUrl} from "~/utils/slug";

const emit = defineEmits<{
  next: [formData]
  back: [],
}>()

const { handleSubmit, isSubmitting, values: formData, setFieldValue } = useForm({
  validationSchema: authPropertySchema,
  initialValues: {
    name: '',
    slug: '',
  },
})

const slug = computed(() => getSlug(formData.name))

watch(() => formData.name, (newName) => {
  setFieldValue('slug', getSlug(newName))
})

const publicUrl = computed(() => getPublicUrl(slug.value))

const copied = ref(false)

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(publicUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const onSubmit = handleSubmit((values) => {
  emit('next', values)
})
</script>

<<template>
  <form class="flex flex-col gap-5 mt-6" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Назва</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Назва об'єкту"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Card class="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader class="pb-3">
        <CardTitle class="text-base flex items-center gap-2">
          <Globe class="w-4 h-4" />
          Ваша публічна адреса
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center gap-2">
          <div class="flex-1 bg-background rounded-md px-3 py-2 text-sm font-mono text-foreground/80 break-all">
            {{ publicUrl }}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            class="shrink-0"
            @click="copyToClipboard"
          >
            <Copy v-if="!copied" class="w-4 h-4" />
            <Check v-else class="w-4 h-4 text-green-500" />
          </Button>
        </div>
        <p class="text-xs text-muted-foreground mt-2">
          {{ copied ? 'Скопійовано!' : 'Натисніть щоб скопіювати' }}
        </p>
      </CardContent>
    </Card>

    <div class="flex gap-3">
      <Button size="lg" type="button" variant="outline" @click="emit('back')">
        Назад
      </Button>
      <Button type="submit" size="lg" class="flex-1" :disabled="isSubmitting">
        Продовжити
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>