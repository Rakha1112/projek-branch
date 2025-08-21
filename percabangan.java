import java.util.Scanner;

public class percabangan {
    
    public static void main(String[] args) {
        

        int a, b;
        a = 4;
        b = 7;

       if(a < b){
            System.out.println("nilai a lebih besar dari nilai b");
        } 
        else{System.out.println("nilai a kurang dari nilai b");
        }  
        Scanner sc = new Scanner(System.in);
        System.out.println("masukan case:");
         int nilai = sc.nextInt();

        switch (nilai) {
            case 1:
                System.out.println("Nilai pertama");
                break;
            case 2:
                System.out.println("Nilai kedua");
                break;
            case 3:
                System.out.println("Nilai ketiga");
                break;
            default:
                System.out.println("nilai tidak ditemukan");
                break;


       }
       sc.close();
   }

}

