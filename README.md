# NectarApp_P2

## Họ tên + MSSV
- Tạ Thành Công
- MSSV: 23810310268
- Lớp: D18CNPM4

## Mô tả chức năng
- Đăng nhập và lưu trạng thái người dùng bằng AsyncStorage.
- Giỏ hàng lưu vĩnh viễn giữa các lần mở app bằng AsyncStorage.
- Thêm/xóa/sửa số lượng sản phẩm trong giỏ hàng.
- Lưu lịch sử đơn hàng và thông tin đơn hàng sau khi thanh toán.
- Điều hướng giữa các màn hình: Home, Explore, Cart, Orders, Account.

## Câu trả lời của 3 câu hỏi:
AsyncStorage hoạt động như thế nào?
- AsyncStorage là một cơ chế lưu trữ dữ liệu dạng key–value trong ứng dụng React Native. Dữ liệu được lưu trực tiếp vào bộ nhớ của thiết bị, vì vậy vẫn tồn tại ngay cả khi người dùng tắt ứng dụng hoặc khởi động lại thiết bị. AsyncStorage hoạt động theo cơ chế bất đồng bộ (asynchronous), do đó việc đọc/ghi dữ liệu cần sử dụng async/await hoặc Promise (.then()).

AsyncStorage thường được sử dụng để lưu các dữ liệu như token đăng nhập, thông tin người dùng hoặc các thiết lập của ứng dụng.

Vì sao dùng AsyncStorage thay vì biến state?
- Biến state trong React chỉ lưu trữ dữ liệu tạm thời trong bộ nhớ RAM và sẽ bị mất khi ứng dụng bị reload hoặc đóng lại. Trong khi đó, AsyncStorage cho phép lưu trữ dữ liệu lâu dài trên thiết bị, giúp dữ liệu vẫn được giữ nguyên giữa các lần mở ứng dụng.

Ngoài ra, state được sử dụng chủ yếu để quản lý và cập nhật giao diện người dùng (UI), còn AsyncStorage phù hợp hơn cho việc lưu trữ dữ liệu cần sử dụng lâu dài. Vì vậy, hai cơ chế này không thay thế cho nhau mà thường được sử dụng kết hợp trong thực tế.

So sánh với Context API
- AsyncStorage và Context API phục vụ hai mục đích khác nhau trong ứng dụng React Native. AsyncStorage được dùng để lưu trữ dữ liệu lâu dài trên thiết bị, trong khi Context API được sử dụng để chia sẻ dữ liệu giữa các component trong toàn bộ ứng dụng.

Context API hoạt động đồng bộ và có thể cập nhật giao diện ngay khi dữ liệu thay đổi, nhưng dữ liệu sẽ bị mất khi ứng dụng reload. Ngược lại, AsyncStorage hoạt động bất đồng bộ, không tự động cập nhật UI, nhưng có khả năng lưu trữ dữ liệu bền vững.

Trong thực tế, hai công cụ này thường được sử dụng kết hợp: AsyncStorage dùng để lưu dữ liệu (ví dụ token), còn Context API dùng để quản lý và cung cấp dữ liệu đó cho toàn bộ ứng dụng trong quá trình chạy.

## Hướng dẫn chạy app
1. Cài đặt Node.js và Expo CLI nếu chưa có.
2. Mở thư mục dự án.
3. Chạy 
pm install.
4. Chạy 
pm start hoặc expo start.
5. Mở app trên thiết bị thật hoặc giả lập.

## Ảnh demo
<img width="946" height="2047" alt="23810310268_01_login" src="https://github.com/user-attachments/assets/a501daac-f00a-46fa-9188-aec17cff60e3" />
<img width="946" height="2047" alt="23810310268_02_autologin" src="https://github.com/user-attachments/assets/4be8931b-70b0-4deb-8e59-b494ecdb4216" />
<img width="946" height="2047" alt="23810310268_03_logout" src="https://github.com/user-attachments/assets/a044a7a6-afea-4ed9-83d1-1e4b1bef298d" />
<img width="946" height="2047" alt="23810310268_04_addtocart" src="https://github.com/user-attachments/assets/99a90dfa-ab04-4b11-b404-12ab60d1ff64" />
<img width="946" height="2047" alt="23810310268_05_stillcart" src="https://github.com/user-attachments/assets/ee0a5bcb-e420-40fc-a5ea-a2c953c3ed32" />
<img width="946" height="2047" alt="23810310268_06_quantitychange" src="https://github.com/user-attachments/assets/0688df0d-b6e8-441e-b23d-9e34ec609f24" />
<img width="946" height="2047" alt="23810310268_07_ordersuccess" src="https://github.com/user-attachments/assets/f2b6d094-11bf-4167-b744-9f4a3241ced9" />
<img width="946" height="2047" alt="23810310268_08_orderlist" src="https://github.com/user-attachments/assets/e8fcc90e-610b-4dff-8b94-9b56bd9ac821" />
<img width="946" height="2047" alt="23810310268_09_reloadapp" src="https://github.com/user-attachments/assets/6bb82ea2-02b1-4355-b7f7-6342887ab4c8" />


