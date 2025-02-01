import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth'
import { useToast } from '~/components/ui/toast';

export const googleAuthProvider = new GoogleAuthProvider();

export const useGoogleAuth = () => {

    const auth = useFirebaseAuth();
    const { toast } = useToast();

    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth!, googleAuthProvider);
            toast({
                title: 'Account created successfully',
            });
            return navigateTo('/', { replace: true });
        } catch (error: any) {
            console.error(error.message);
            if (error.code === 'auth/email-already-in-use') {
                toast({
                    title: 'Email already in use',
                });
            }
        }
    }

    return {
        signUpWithGoogle
    }
}