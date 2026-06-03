<script setup lang="ts">
import type {Property} from "~/types/models";

const propertiesStore = usePropertiesStore()

const onSelectProperty = async (prp: Property) => {
  await propertiesStore.loadPropertyById(prp.id)
  navigateTo(`/admin/${prp.slug}`)
}
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <h1>Zatyshok</h1>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Об'єкти</SidebarGroupLabel>

        <SidebarGroupContent>

          <SidebarMenu>
            <template v-for="prp of propertiesStore.myProperties" :key="prp.id">
              <SidebarMenuItem @click="onSelectProperty(prp)">
                <SidebarMenuButton as-child>
                  <Label>{{ prp.name }}</Label>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </template>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarGroup>
        <SidebarGroupLabel>Аккаунт</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <a href="#">
                <Home/>
                <span>Підписки</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <a href="#">
                <Home/>
                <span>Налаштування</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <a href="#">
                <Home/>
                <span>Вийти</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

    </SidebarFooter>
  </Sidebar>
</template>

<style scoped>

</style>