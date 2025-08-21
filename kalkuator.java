import java.util.Scanner;
public class kalkuator {

    public static void main(String[] args) {
       
        Scanner scanner = new Scanner(System.in);
        int a;
        System.out.print("maukan angka pertama: ");
        a = scanner.nextInt();

        int b;
        System.out.print("masukan angka ke dua: ");
        b = scanner.nextInt();


        boolean hasil;

        hasil = a == b;
        System.out.println("Apakah "  + a + " sama dengan " + b +"? " + hasil);

        hasil = a != b;
        System.out.println("Apakah "  + a + " tidak sama dengan " + b +"? " + hasil);

        hasil = a > b;
        System.out.println("Apakah "  + a + " lebih besar dari " + b +"? " + hasil);

        hasil = a < b;
        System.out.println("Apakah "  + a + " lebih kecil dari " + b +"? "  + hasil);

        hasil = a >= b;
        System.out.println("Apakah "  + a + " lebih besar atau sama dengan " + b +"? " + hasil);

        hasil = a <= b;
        System.out.println("apakah "  + a + " lebih kecil atau sama dengan "  + b +"? " + hasil);

    }

    
} 
