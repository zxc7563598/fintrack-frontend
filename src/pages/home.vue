<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="4">
        <v-card class="fill-height" elevation="4">
          <template #title>
            <span class="text-h5 font-weight-bold">九月·</span>
            <span class="font-weight-bold text-body-1">支出</span>
          </template>
          <template #text>
            <v-row dense>
              <v-col cols="12">
                <span class="text-h5 text-primary">¥ 0.00</span>
              </v-col>
              <v-col cols="12">
                <span class="text-body-1 text-high-emphasis">当月收入：</span>
                <span class="text-body-1 text-high-emphasis">¥ 0.00</span>
              </v-col>
              <v-col cols="12">
                <v-btn class="details-link bg-primary mt-1" rounded="xs">
                  查看详情
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="8">
        <v-card class="fill-height" elevation="4">
          <template #title class="font-weight-bold">资产概要</template>
          <template #text>
            <v-row dense>
              <v-col cols="12" class="mb-2">
                <div class="text-body-1 text-high-emphasis">您已经记录了 2 个账户</div>
                <div class="text-body-1 text-high-emphasis">最后的数据来自 2025-02-01</div>
              </v-col>
              <v-row dense>
                <v-col cols="12" md="4" class="d-flex mt-2">
                  <v-btn icon="mdi-plus" class="details-link bg-primary" :rounded="false"></v-btn>
                  <div class="d-flex flex-column ml-2">
                    <div class="text-subtitle-2">总资产</div>
                    <div class="text-h6">¥ 100.00</div>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="d-flex mt-2">
                  <v-btn icon="mdi-plus" class="details-link bg-primary" :rounded="false"></v-btn>
                  <div class="d-flex flex-column ml-2">
                    <div class="text-subtitle-2">总负债</div>
                    <div class="text-h6">¥ 100.00</div>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="d-flex mt-2">
                  <v-btn icon="mdi-plus" class="details-link bg-primary" :rounded="false"></v-btn>
                  <div class="d-flex flex-column ml-2">
                    <div class="text-subtitle-2">净资产</div>
                    <div class="text-h6">¥ 100.00</div>
                  </div>
                </v-col>
              </v-row>
            </v-row>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="fill-height" elevation="4">
              <template #title>
                <div>
                  <v-btn icon="mdi-plus" size="small" class="details-link bg-primary" elevation="0"></v-btn>
                  <span class="ml-3 text-subtitle-1 font-weight-bold">今日</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" density="compact" size="large" v-bind="props"
                        class="float-right"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>查看详情</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
              <template #text>
                <v-row dense>
                  <v-col cols="12" class="mt-3">
                    <span class="text-h5 font-weight-bold text-income">¥ 0.00</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-h6 font-weight-medium text-loss">¥ 0.00</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-body-2">2025-01-01</span>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="fill-height" elevation="4">
              <template #title>
                <div>
                  <v-btn icon="mdi-plus" size="small" class="details-link bg-primary" elevation="0"></v-btn>
                  <span class="ml-3 text-subtitle-1 font-weight-bold">本周</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" density="compact" size="large" v-bind="props"
                        class="float-right"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>查看详情</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
              <template #text>
                <v-row dense>
                  <v-col cols="12" class="mt-3">
                    <span class="text-h5 font-weight-bold text-income">¥ 0.00</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-h6 font-weight-medium text-loss">¥ 0.00</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-body-2">2025-01-01</span>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="fill-height" elevation="4">
              <template #title>
                <div>
                  <v-btn icon="mdi-plus" size="small" class="details-link bg-primary" elevation="0"></v-btn>
                  <span class="ml-3 text-subtitle-1 font-weight-bold">本月</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" density="compact" size="large" v-bind="props"
                        class="float-right"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>查看详情</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
              <template #text>
                <v-row dense>
                  <v-col cols="12" class="mt-3">
                    <span class="text-h5 font-weight-bold text-income">¥ 0.00</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-h6 font-weight-medium text-loss">¥ 0.00</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-body-2">2025-01-01</span>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="fill-height" elevation="4">
              <template #title>
                <div>
                  <v-btn icon="mdi-plus" size="small" class="details-link bg-primary" elevation="0"></v-btn>
                  <span class="ml-3 text-subtitle-1 font-weight-bold">今年</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" density="compact" size="large" v-bind="props"
                        class="float-right"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>查看详情</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
              <template #text>
                <v-row dense>
                  <v-col cols="12" class="mt-3">
                    <span class="text-h5 font-weight-bold text-income">¥ 0.00</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-h6 font-weight-medium text-loss">¥ 0.00</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-body-2">2025-01-01</span>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="fill-height" elevation="4">
          <template #title class="font-weight-bold">收入与支出趋势</template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>