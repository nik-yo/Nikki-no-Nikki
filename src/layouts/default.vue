<style>
h1.header {
  font-family: "Marck Script", cursive;
  font-weight: 400;
  font-style: normal;
}
h1.header span.kanji {
  display: none;
}
h1.header:hover span.romaji {
  display: none;
}
h1.header:hover span.kanji {
  display: inline;
}
</style>

<template>
  <main>
    <div class="relative bg-[url('/diary.jpeg')] bg-center bg-cover">
      <!-- Overlay for reduced opacity -->
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div class="relative flex flex-col h-screen">
        <div class="text-center my-4">
          <h1 class="header text-6xl text-white text-shadow-lg opacity-90"><NuxtLink to="/">Nikki <span class="romaji">no nikki</span><span class="kanji text-4xl font-semibold">の 日記</span></NuxtLink></h1>
          <div class="flex md:mx-16 md:mx-20 lg:mx-40 2xl:mx-60 px-4">
            <div><NuxtLink to="/posts" class="bg-orange-200 rounded inline-block px-4 py-1">Posts</NuxtLink></div>
            <div class="grow"><h5 class="text-lg text-white font-semibold text-shadow-md"><NuxtLink to="/">Nikki's diary</NuxtLink></h5></div>
            <div><NuxtLink to="/search" class="bg-orange-200 rounded inline-block px-4 py-1">Search</NuxtLink></div>
          </div>
        </div>
        <div class="bg-white opacity-90 px-4 md:px-8 py-4 text-start grow md:rounded-2xl
                  relative overflow-auto md:mx-16 md:mx-20 lg:mx-40 2xl:mx-60 mb-4">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>