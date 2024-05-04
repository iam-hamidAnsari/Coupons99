package coupon99.coupon99.endpoint;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import coupon99.coupon99.AddCoupon.AddCoupon;
import coupon99.coupon99.AddCoupon.repository.AddCouponRepository;
import coupon99.coupon99.RegistrationPageModlel.RegistrationPage;
import coupon99.coupon99.RegistrationPageModlel.repository.RegRepository;
import coupon99.coupon99.service.coupon99Service;

@CrossOrigin
@RestController
public class Coupon99Controller {

	// repository's
	@Autowired
	private RegRepository Regrepo;
	@Autowired
	private AddCouponRepository Couponrepo;
	@Autowired
	public coupon99Service service; //object of service class

	//registerform
	@PostMapping("/Register")
	private boolean RegistrationForm(@RequestBody RegistrationPage rp) {
		try {
			if (rp == null) {
				return false;
			} else {
				Regrepo.save(rp);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	// adding coupon
	@PostMapping("/AddCoupon")
	private String addcoupon(@RequestParam("couponTitle") String couponTitle,
			@RequestParam("couponCode") String couponCode, @RequestParam("imageUrl") MultipartFile image,
			@RequestParam("description") String description, @RequestParam("category") String category,
			@RequestParam("expiryDate") Date expiryDate, @RequestParam("percentage") int percentage,
			@RequestParam("terms") String terms,@RequestParam("price") int price ){

		try {
			// Assuming 'service.uploadImage' handles the file upload and returns the image
			// URL or path
			String uploadedImageUrl = service.storeFile(image); // Adjusted to use the service
			AddCoupon coupon = new AddCoupon();
			coupon.setPrice(price);
			coupon.setCouponTitle(couponTitle);
			coupon.setCouponCode(couponCode);
			coupon.setImageUrl(uploadedImageUrl); // Use the uploaded image URL or path
			coupon.setDescription(description);
			coupon.setCategory(category);
			coupon.setExpiryDate(expiryDate);
			coupon.setPercentage(percentage);
			coupon.setTerms(terms);

			Couponrepo.save(coupon);
			return "Coupon added successfully!";
		} catch (Exception e) {
			return "Error adding the Coupon: " + e.getMessage();
		}

	}
	
	//login page
	@PostMapping("/Login")
	private RegistrationPage Loginverification(@RequestParam String username) {
		if (Regrepo != null) {
			return Regrepo.findById(username).orElse(null);
		} else {
			return null;
		}
	}
	
	//retrieving coupons
	@PostMapping("/findall")
	private List<AddCoupon> findall(){
		return Couponrepo.findAll();
	}
	
	//Search Coupons using title
	@GetMapping("/Search")
	private List<AddCoupon>  searchCoupons(@RequestParam String query){
		return Couponrepo.findBycouponTitleIgnoreCase(query);
	}
	
	@GetMapping("/id")
	private AddCoupon getById(@RequestParam Long id) {
		return Couponrepo.findById(id).orElse(null);
	}

}
