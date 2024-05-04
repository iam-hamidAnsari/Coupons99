package coupon99.coupon99.AddCoupon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import coupon99.coupon99.AddCoupon.AddCoupon;

public interface AddCouponRepository extends JpaRepository<AddCoupon, Long>{
	List<AddCoupon> findBycouponTitleIgnoreCase(String couponTitle);

}
