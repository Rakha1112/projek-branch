import java.util.Scanner;

public class calculator2  {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Pilih operasi:");
        System.out.println("1. Penjumlahan");
        System.out.println("2. Pengurangan");
        System.out.println("3. Perkalian");
        System.out.println("4. Pembagian");
        System.out.println("5. Modulus");
        System.out.println("6. Pemangkatan");
        
        System.out.print("Masukkan pilihan (1/2/3/4/5/6): ");
        int pilihan = scanner.nextInt();
        
        System.out.print("Masukkan angka pertama: ");
        double angka1 = scanner.nextDouble();
        
        System.out.print("Masukkan angka kedua: ");
        double angka2 = scanner.nextDouble();
        
        double hasil;
        
        switch (pilihan) {
            case 1:
                hasil = angka1 + angka2;
                System.out.println("Hasil Penjumlahan: " + hasil);
                break;
            case 2:
                hasil = angka1 - angka2;
                System.out.println("Hasil Pengurangan: " + hasil);
                break;
            case 3:
                hasil = angka1 * angka2;
                System.out.println("Hasil Perkalian: " + hasil);
                break;
            case 4:
                if (angka2 != 0) {
                    hasil = angka1 / angka2;
                    System.out.println("Hasil Pembagian: " + hasil);
                } else {
                    System.out.println("Error: Pembagi tidak boleh 0.");
                }
                break;
            case 5:
                hasil = angka1 % angka2;
                System.out.println("Hasil Modulus: " + hasil);
                break;
            case 6:
                hasil = Math.pow(angka1, angka2);
                System.out.println("Hasil Pemangkatan: " + hasil);
                break;
            default:
                System.out.println("Pilihan tidak valid.");
                break;
        }
        
        scanner.close();
    }
}


