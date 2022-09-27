export class CapitalizedUtil {
    public static capitalized<String>(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}