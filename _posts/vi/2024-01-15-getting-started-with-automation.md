---
title: "Bắt đầu với Automation: Từ lý thuyết đến thực hành"
date: 2024-01-15
categories: [automation]
excerpt: "Tôi đã mất gần hai năm với việc 'sắp tự động hoá' nhưng không làm. Đây là cách tôi thực sự bắt đầu."
---

Trong suốt gần hai năm, tôi luôn nói với bản thân rằng mình "sắp" tự động hoá công việc. Tôi đọc bài viết về Zapier, xem video về n8n, bookmark hàng chục tutorial về Python scripting — rồi đóng tab lại và tiếp tục làm mọi thứ thủ công như cũ.

Sự thay đổi bắt đầu khi tôi đặt ra một câu hỏi khác: **Việc nào tôi ghét làm nhất mỗi tuần?**

Không phải "việc nào tôi có thể tự động hoá" — vì câu hỏi đó quá rộng. Mà là việc nào cụ thể, lặp đi lặp lại, khiến tôi thở dài mỗi khi nhìn thấy nó trong danh sách to-do.

Với tôi, đó là việc tổng hợp báo cáo hàng tuần từ ba nguồn dữ liệu khác nhau, format lại trong Google Sheets, rồi copy paste vào email gửi cho team. Mỗi tuần mất khoảng 45 phút, không đòi hỏi tư duy, chỉ cần tay và sự kiên nhẫn.

## Quy trình tôi đã làm

**Bước 1: Ghi lại từng bước thủ công.** Tôi mở file text và ghi lại mọi thao tác tôi làm, bao gồm cả những thứ tưởng chừng hiển nhiên: "Mở Chrome → Vào dashboard X → Click Export → Chọn tuần này → Download CSV → Đổi tên file..."

**Bước 2: Xác định đâu là phần máy tính làm được.** Không phải mọi bước đều có thể tự động. Nhưng hầu hết đều có thể — nhất là những bước lặp lại chính xác mỗi lần.

**Bước 3: Bắt đầu với công cụ đơn giản nhất.** Tôi không bắt đầu bằng Python hay API. Tôi dùng Google Apps Script — vì dữ liệu của tôi đã ở trong Google Workspace.

Sau ba buổi tối, script đó hoạt động. 45 phút mỗi tuần giờ là 0 phút.

## Điều quan trọng hơn kết quả

Cái tôi học được không phải là cách viết script. Mà là cách *nhìn* công việc của mình khác đi: mỗi task lặp lại là một câu hỏi — "Tại sao mình vẫn làm cái này bằng tay?"

Bây giờ tôi có danh sách khoảng tám quy trình đang chờ được tự động hoá. Tôi làm lần lượt, mỗi tháng một cái. Không vội.

---

*Bạn có task nào lặp đi lặp lại và ghét làm không? Đó là điểm bắt đầu.*
