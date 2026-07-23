import jsPDF from 'jspdf';
import type { Complaint } from '../types';
import { getCategory } from '../data/categories';
import { getDistrict } from '../data/districts';
import { getDepartment } from '../data/departments';
import { formatDateTime } from './format';

export function downloadComplaintPdf(complaint: Complaint) {
  const doc = new jsPDF();
  const category = getCategory(complaint.categoryId);
  const district = getDistrict(complaint.districtId);
  const dept = getDepartment(complaint.departmentId);

  doc.setFillColor(0, 106, 78);
  doc.rect(0, 0, 210, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('Citizen Voice Bangladesh', 14, 13);
  doc.setFontSize(10);
  doc.text('Official Complaint Record', 14, 20);

  doc.setTextColor(20, 20, 20);
  doc.setFontSize(13);
  doc.text(complaint.title, 14, 40);

  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  let y = 50;
  const line = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 60, y);
    y += 7;
  };

  line('Tracking Code', complaint.trackingCode);
  line('Category', category?.nameEn ?? '-');
  line('Priority', complaint.priority.toUpperCase());
  line('Status', complaint.status.replace('_', ' ').toUpperCase());
  line('District', `${district?.nameEn ?? '-'}, ${complaint.upazila}`);
  line('Address', complaint.address);
  line('Department', dept?.nameEn ?? '-');
  line('Submitted By', complaint.isAnonymous ? 'Anonymous Citizen' : complaint.citizenName);
  line('Submitted On', formatDateTime(complaint.createdAt, 'en'));
  line('Last Updated', formatDateTime(complaint.updatedAt, 'en'));
  line('Est. Resolution', formatDateTime(complaint.estResolutionDate, 'en'));

  y += 3;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('Description:', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(complaint.description, 180);
  doc.text(descLines, 14, y);
  y += descLines.length * 5.5 + 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('AI Summary:', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const summaryLines = doc.splitTextToSize(complaint.aiSummary, 180);
  doc.text(summaryLines, 14, y);
  y += summaryLines.length * 5.5 + 10;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('Timeline:', 14, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  complaint.timeline.forEach(ev => {
    doc.setTextColor(60, 60, 60);
    doc.text(`${formatDateTime(ev.date, 'en')} — ${ev.action} (${ev.actor})`, 14, y);
    y += 5.5;
  });

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('This is a system-generated document from Citizen Voice Bangladesh — a Digital Bangladesh Initiative.', 14, 285);

  doc.save(`${complaint.trackingCode}.pdf`);
}
