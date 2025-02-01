export default defineNuxtRouteMiddleware(async (to, from) => {

    const user = await getCurrentUser();

    // If user is NOT logged in & trying to access a protected page, redirect to login
    if (!user && !to.path.startsWith("/auth")) {
        return navigateTo({
            path: "/auth/login",
            query: { redirect: to.fullPath },
        });
    }

    // If user is logged in & trying to access login/register/forgot-password, redirect to dashboard
    if (user && to.path.startsWith("/auth")) {
        return navigateTo("/");
    }

});