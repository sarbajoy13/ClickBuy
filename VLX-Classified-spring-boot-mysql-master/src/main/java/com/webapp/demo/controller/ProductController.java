package com.webapp.demo.controller;

import org.springframework.http.MediaType;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.webapp.demo.model.Products;
import com.webapp.demo.model.ResponseModelList;
import com.webapp.demo.model.ResponseModelParameter;
import com.webapp.demo.repo.ProductsRepo;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.29.226:3000"})
@RestController
public class ProductController {
	@Autowired
	ProductsRepo productsrepo;
	
	// controller for products
	@GetMapping("/")
	public String welcome() {
		return "Welcome to ecommerce";
	}

	@GetMapping("/api/approvedProducts")
	@ResponseBody
	public ResponseModelList<Products> getApprovedProducts() {
		List<Products> products= productsrepo.approvedProducts();
		return new ResponseModelList<Products>(true,"all products",products);
	}
	
	// get pending product for particular seller
	@GetMapping("/api/pendingProducts/{sellerId}")
	@ResponseBody
	public ResponseModelList<Products> getPendingProductsBySellerId(@PathVariable("sellerId") int sellerId) {
		List<Products> products= productsrepo.pendingProducts();
		List<Products> pending=new ArrayList<>();
		for(Products product :products)
		{
			if(product.getCreatedby()==sellerId)
				pending.add(product);
		}
		return new ResponseModelList<Products>(true,"pending products",pending);
	}

	
	// get all products which are not approved
	
	@GetMapping("/pendingProducts")
	@ResponseBody
	public ResponseModelList<Products> getPendingProducts() {
		List<Products> products= productsrepo.pendingProducts();
		return new ResponseModelList<Products>(true,"pending products",products);
	}

	@GetMapping("/api/rejectedProducts/{sellerId}")
	@ResponseBody
	public ResponseModelList<Products> getRejectedProductsBySellerId(@PathVariable("sellerId") int sellerId) {
		List<Products> products= productsrepo.rejectedProducts();
		List<Products> rejected=new ArrayList<>();
		for(Products product :products)
		{
			if(product.getCreatedby()==sellerId)
				rejected.add(product);
		}
		return new ResponseModelList<Products>(true,"rejected products",rejected);
	}
	
	// approve one product
	@PutMapping("/approveProduct/{id}")
	public ResponseModelParameter<Products> approveProduct(@PathVariable("id") int id)
	{
		Products product=productsrepo.findById(id).orElse(null);
		product.setStatus("approved");
		productsrepo.save(product);
		return new ResponseModelParameter<Products>(true, "product approved", product);
	}

	//reject a product
	@PutMapping("/rejectProduct/{id}")
	public ResponseModelParameter<Products> rejectProduct(@PathVariable("id") int id)
	{
		Products product=productsrepo.findById(id).orElse(null);
		product.setStatus("rejected");
		productsrepo.save(product);
		return new ResponseModelParameter<Products>(true, "product approved", product);
	}
	
	// delete product by id
//	@DeleteMapping("/rejectProduct/{id}")
//	public ResponseModelParameter<Products> deleteProduct(@PathVariable("id") int id)
//	{
//		Products product=productsrepo.findById(id).orElse(null);
//		productsrepo.delete(product);
//		return new ResponseModelParameter<Products>(true, "product deleted", product);
//	}
}
