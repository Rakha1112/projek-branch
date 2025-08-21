 import java.util.Scanner;

public class biodata {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Masukkan Biodata Diri!");

        System.out.print("Masukkan Nama Anda : ");
        String name = sc.nextLine();

        System.out.print("Masukkan Umur Anda : ");
        int age = sc.nextInt();
        sc.nextLine(); 

        System.out.print("Masukkan Alamat Anda : ");
        String address = sc.nextLine();

        System.out.print("Masukkan Hobi Anda : ");
        String hobby = sc.nextLine();

        System.out.print("Masukkan Jenis Kelamin (L/P) : ");
        char gender = sc.next().charAt(0);
        sc.nextLine(); 

        System.out.print("Masukkan kelas: ");
        String education = sc.nextLine();

        System.out.print("Masukkan Tinggi Badan (cm) : ");
        int height = sc.nextInt();
        sc.nextLine(); 

        System.out.print("Masukkan Berat Badan (kg) : ");
        int weight = sc.nextInt();
        sc.nextLine(); 

        System.out.println("\nBiodata Anda adalah:");
        System.out.println("Nama : " + name);
        System.out.println("Umur : " + age + " tahun");
        System.out.println("Alamat : " + address);
        System.out.println("Hobi : " + hobby);
        System.out.println("Jenis Kelamin : " + (gender == 'L' ? "Laki-laki" : "Perempuan"));
        System.out.println("Status Pendidikan : " + education);
        System.out.println("Tinggi Badan : " + height + " cm");
        System.out.println("Berat Badan : " + weight + " kg");

        
        double bmi = calculateBMI(height, weight);
        System.out.println("BMI : " + String.format("%.2f", bmi));

        String bmiCategory = determineBMICategory(bmi);
        System.out.println("Kategori BMI : " + bmiCategory);

        sc.close();
    }

    private static double calculateBMI(int height, int weight) {
        return weight / Math.pow(height / 100.0, 2);
    }

    private static String determineBMICategory(double bmi) {
        if (bmi < 18.5) {
            return "Kurus";
        } else if (bmi < 25) {
            return "Normal";
        } else if (bmi < 30) {
            return "Gemuk";
        } else {
            return "Obesitas";
        }
    }
}

