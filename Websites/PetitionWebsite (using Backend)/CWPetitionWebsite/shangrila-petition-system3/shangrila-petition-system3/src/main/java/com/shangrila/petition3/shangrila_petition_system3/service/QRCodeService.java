package com.shangrila.petition3.shangrila_petition_system3.service;

import org.springframework.stereotype.Service;
import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import java.util.List;

@Service
public class QRCodeService {

	/*
	 * private static final String QR_CODE_DIRECTORY =
	 * "C:/Users/given/Downloads/BioID_QR_codes/BioID_QR_codes"; // Directory where
	 * QR code images are stored
	 */
    // List of valid BioIDs
    private List<String> validBioIDs = List.of(
        "K1YL8VA2HG", "7DMPYAZAP2", "D05HPPQNJ4", "2WYIM3QCK9", "DHKFIYHMAZ", 
        "LZK7P0X0LQ", "H5C98XCENC", "6X6I6TSUFG", "QTLCWUS8NB", "Y4FC3F9ZGS", 
        "V30EPKZQI2", "O3WJFGR5WE", "SEIQTS1H16", "X16V7LFHR2", "TLFDFY7RDG", 
        "PGPVG5RF42", "FPALKDEL5T", "2BIB99Z54V", "ABQYUQCQS2", "9JSXWO4LGH", 
        "QJXQOUPTH9", "GOYWJVDA8A", "6EBQ28A62V", "30MY51J1CJ", "FH6260T08H", 
        "JHDCXB62SA", "O0V55ENOT0", "F3ATSRR5DQ", "1K3JTWHA05", "FINNMWJY0G", 
        "CET8NUAE09", "VQKBGSE3EA", "E7D6YUPQ6J", "BPX8O0YB5L", "AT66BX2FXM", 
        "1PUQV970LA", "CCU1D7QXDT", "TTK74SYYAN", "4HTOAI9YKO", "PD6XPNB80J", 
        "BZW5WWDMUY", "340B1EOCMG", "CG1I9SABLL", "49YFTUA96K", "V2JX0IC633", 
        "C7IFP4VWIL", "RYU8VSS4N5", "S22A588D75", "88V3GKIVSF", "8OLYIE2FRC"
    );

   
    public String decodeQRCode(File qrCodeFile) throws IOException {
        try {
            // Read the image file
            BufferedImage bufferedImage = ImageIO.read(qrCodeFile);
            if (bufferedImage == null) {
                throw new IOException("Invalid QR code image.");
            }

            // Decode the QR code
            BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(bufferedImage)));
            Reader reader = new MultiFormatReader();
            Result result = reader.decode(binaryBitmap);

            // Return the decoded BioID
            return result.getText();
        } catch (Exception e) {
            throw new IOException("Error decoding QR code", e);
        }
    }

    
    public boolean isValidQRCode(String bioID) {
        // Check if the decoded BioID exists in the list of valid BioIDs
        return validBioIDs.contains(bioID);
    }

    
    public boolean isQRCodeValid(File qrCodeFile) throws IOException {
        // Decode the QR code and get the BioID
        String bioID = decodeQRCode(qrCodeFile);

        // Check if the decoded BioID is valid
        return isValidQRCode(bioID);
    }
}
