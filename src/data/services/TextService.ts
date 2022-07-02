export const TextService = {
    textLimited(text: string, max_size: number): string {
        if(text.length < max_size){
            return text;
        }

        return text.slice(0, max_size)+ '...';
    }
}