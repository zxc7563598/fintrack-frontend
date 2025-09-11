<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="12" lg="4">
          <v-card title="Card title" subtitle="Subtitle" text="..."></v-card>
        </v-col>
        <v-col cols="12" md="12" lg="8">
          <v-card title="Card title" subtitle="Subtitle" text="..."></v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6">
              <v-card title="Card title" subtitle="Subtitle" text="..."></v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card title="Card title" subtitle="Subtitle" text="..."></v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card title="Card title" subtitle="Subtitle" text="..."></v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card title="Card title" subtitle="Subtitle" text="..."></v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-card title="Card title" subtitle="Subtitle" text="..." class="fill-height"></v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
</script>
