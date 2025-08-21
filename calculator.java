import java.util.Scanner;

public class calculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // memasukan angka
        System.out.println("Masukkan angka pertama: ");
        double angka1 = sc.nextDouble();
        
        System.out.println("Masukkan angka kedua: ");
        double angka2 = sc.nextDouble();

        // pilihan kalkulator
        System.out.println("Pilih operasi:");
        System.out.println("1. Penjumlahan");
        System.out.println("2. Pengurangan");
        System.out.println("3. Perkalian");
        System.out.println("4. Pembagian");
        System.out.println("5. Modulus");
        int pilihan = sc.nextInt();

        // hasil dari kalkulator
        double hasil = 0;
        boolean valid = true; // pemeriksaan betul atau tidak

        if (pilihan == 1) {
            hasil = angka1 + angka2;
        } else if (pilihan == 2) {
            hasil = angka1 - angka2;
        } else if (pilihan == 3) {
            hasil = angka1 * angka2;
        } else if (pilihan == 4) {
            if (angka2 != 0) {
                hasil = angka1 / angka2;
            } else {
                System.out.println("Error: Pembagian dengan nol tidak diperbolehkan.");
                valid = false;
            }
        } else if (pilihan == 5) {
            if (angka2 != 0) {
                hasil = angka1 % angka2;
            } else {
                System.out.println("Error: Pembagian dengan nol tidak diperbolehkan untuk operasi modulus.");
                valid = false;
            }
        } else {
            System.out.println("Pilihan tidak valid.");
            valid = false;
        }

        // Menampilkan hasil angkanya jika benar
        if (valid) {
            System.out.println("Hasil: " + hasil);
        }

        sc.close();
    }
}