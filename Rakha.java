import java.util.Scanner;
public class Rakha {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Masukkan tinggi segitiga: ");
        int tinggi = scanner.nextInt();      
        for (int i = 1; i <= tinggi; i++) {           
            for (int j = tinggi; j > i; j--) {
                System.out.print(" ");
            }            
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }         
            System.out.println();
        }
        scanner.close();
    }
}