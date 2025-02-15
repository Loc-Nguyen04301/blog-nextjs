import anh_nho_em_nguoi_yeu_cu from './anh_nho_em_nguoi_yeu_cu.mp3';
import cau_vong_sau_mua from './cau_vong_sau_mua.mp3';
import chi_yeu_minh_em from './chi_yeu_minh_em.mp3';
import dung_lam_anh_dau from './dung_lam_anh_dau.mp3';
import e_la_khong_the from './e_la_khong_the.mp3';
import em_se_la_co_dau from './em_se_la_co_dau.mp3';
import em_luon_o_trong_tam_tri_anh from './em_luon_o_trong_tam_tri_anh.mp3';
import mon_qua_vo_gia from './mon_qua_vo_gia.mp3';
import ngoi_ben_em from './ngoi_ben_em.mp3';
import noi_dau_xot_xa from './noi_dau_xot_xa.mp3';


import anh_nho_em_nguoi_yeu_cu_img from './anh_nho_em_nguoi_yeu_cu.jpg';
import cau_vong_sau_mua_img from './cau_vong_sau_mua.jpg';
import chi_yeu_minh_em_img from './chi_yeu_minh_em.jpg';
import dung_lam_anh_dau_img from './dung_lam_anh_dau.jpg';
import e_la_khong_the_img from './e_la_khong_the.jpg';
import em_se_la_co_dau_img from './em_se_la_co_dau.jpg';
import em_luon_o_trong_tam_tri_anh_img from './em_luon_o_trong_tam_tri_anh.jpg';
import mon_qua_vo_gia_img from './mon_qua_vo_gia.jpg';
import ngoi_ben_em_img from './ngoi_ben_em.jpg';
import noi_dau_xot_xa_img from './noi_dau_xot_xa.jpg';

import { Track } from '@/types/track';

export const trackMusics: Track[] = [
    {
        title: 'E là không thể',
        src: e_la_khong_the,
        author: 'Anh Quân',
        thumbnail: e_la_khong_the_img,
    },
    {
        title: 'Anh nhớ em người yêu cũ',
        src: anh_nho_em_nguoi_yeu_cu,
        author: 'Minh Vương M4U',
        thumbnail: anh_nho_em_nguoi_yeu_cu_img,
    },
    {
        title: 'Cầu vồng sau mưa',
        src: cau_vong_sau_mua,
        author: 'Cao Thái Sơn',
        thumbnail: cau_vong_sau_mua_img,
    },
    {
        title: 'Chỉ yêu mình em',
        src: chi_yeu_minh_em,
        author: 'Châu Khải Phong',
        thumbnail: chi_yeu_minh_em_img,
    },
    {
        title: 'Đừng làm anh đau',
        src: dung_lam_anh_dau,
        author: 'Minh Vương M4U',
        thumbnail: dung_lam_anh_dau_img,
    },
    {
        title: 'Em sẽ là cô dâu',
        src: em_se_la_co_dau,
        author: 'Minh Vương M4U, Huy Cung',
        thumbnail: em_se_la_co_dau_img,
    },
    {
        title: 'Em luôn ở trong tâm trí anh',
        src: em_luon_o_trong_tam_tri_anh,
        author: 'The Men',
        thumbnail: em_luon_o_trong_tam_tri_anh_img,
    },
    {
        title: 'Món quà vô giá',
        src: mon_qua_vo_gia,
        author: 'Tim',
        thumbnail: mon_qua_vo_gia_img,
    },
    {
        title: 'Ngồi bên em',
        src: ngoi_ben_em,
        author: 'Phan Đinh Tùng',
        thumbnail: ngoi_ben_em_img,
    },
    {
        title: 'Nỗi đau xót xa',
        src: noi_dau_xot_xa,
        author: 'Minh Vương M4U',
        thumbnail: noi_dau_xot_xa_img,
    },
];