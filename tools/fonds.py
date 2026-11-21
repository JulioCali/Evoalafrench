"""Génère les fonds d'écran de l'appli (dossier bg/) : une ville, de jour et de nuit.
   Lancer :  python3 tools/fonds.py
   Chaque scène est dessinée une fois ; la palette (jour / nuit) change les couleurs.
   Format portrait 390×844 : le décor occupe le bas, le haut reste un ciel calme sous le texte."""
import math, os, random

W, H = 390, 844
OUT = os.path.join(os.path.dirname(__file__), "..", "bg")

# ---------- outils ----------
def poly(pts, fill, extra=""):
    return f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="{fill}"{extra}/>'
def rect(x, y, w, h, fill, rx=0, extra=""):
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}"{extra}/>'
def circ(x, y, r, fill, extra=""):
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{fill}"{extra}/>'
def path(d, fill, extra=""):
    return f'<path d="{d}" fill="{fill}"{extra}/>'
def hill(y0, amp, fill, seed, n=6, phase=0):
    """colline douce sur toute la largeur, de y0 jusqu'en bas"""
    r = random.Random(seed); pts = [(-10, H)]
    for i in range(n + 1):
        x = -10 + (W + 20) * i / n
        pts.append((x, y0 - amp * (0.5 + 0.5 * math.sin(i * 1.3 + phase)) - r.uniform(0, amp * .3)))
    pts.append((W + 10, H))
    d = f"M{pts[0][0]},{pts[0][1]} L{pts[1][0]:.1f},{pts[1][1]:.1f} "
    for i in range(1, len(pts) - 2):
        mx, my = (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2
        d += f"Q{pts[i][0]:.1f},{pts[i][1]:.1f} {mx:.1f},{my:.1f} "
    d += f"L{pts[-2][0]:.1f},{pts[-2][1]:.1f} L{W + 10},{H} Z"
    return path(d, fill)
def windows(x, y, w, h, P, seed, cols=None, rows=None, size=4, gap=7):
    """fenêtres : discrètes de jour, quelques-unes allumées la nuit"""
    if not P["night"] and not P.get("dayWin"): return ""
    r = random.Random(seed); out = []
    cols = cols or max(1, int((w - 6) // gap)); rows = rows or max(1, int((h - 8) // (gap + 2)))
    ox = x + (w - (cols - 1) * gap - size) / 2
    for i in range(cols):
        for j in range(rows):
            if P["night"] and r.random() > .45: continue
            if not P["night"] and r.random() > .8: continue
            out.append(rect(ox + i * gap, y + 6 + j * (gap + 2), size, size + 1, P["win"] if P["night"] else P["dayWin"]))
    return "".join(out)
def building(x, base, w, h, fill, P, seed, roof=None):
    s = rect(x, base - h, w, h, fill)
    if roof == "mansard": s += poly([(x - 2, base - h), (x + 4, base - h - 12), (x + w - 4, base - h - 12), (x + w + 2, base - h)], fill)
    if roof == "flat2": s += rect(x + w * .2, base - h - 8, w * .3, 8, fill)
    return s + windows(x + 2, base - h, w - 4, h - 10, P, seed)
def palm(x, base, h, fill, lean=8):
    tx, ty = x + lean, base - h
    s = path(f"M{x - 2.5},{base} Q{x + lean * .2},{base - h * .5} {tx - 1.5},{ty} L{tx + 1.5},{ty} Q{x + lean * .2 + 4},{base - h * .5} {x + 2.5},{base} Z", fill)
    for a in (-160, -125, -90, -55, -20, 15):
        rad = math.radians(a); ex, ey = tx + 22 * math.cos(rad), ty + 22 * math.sin(rad) + 10
        cx, cy = tx + 12 * math.cos(rad), ty + 12 * math.sin(rad) - 6
        s += path(f"M{tx},{ty} Q{cx:.1f},{cy:.1f} {ex:.1f},{ey:.1f} Q{cx:.1f},{cy + 5:.1f} {tx},{ty + 2} Z", fill)
    return s
def stars(P, seed, n=55):
    if not P["night"]: return ""
    r = random.Random(seed)
    return "".join(circ(r.uniform(0, W), r.uniform(10, H * .55), r.choice([.6, .8, 1, 1.3]), "#fff", f' opacity="{r.uniform(.35, .9):.2f}"') for _ in range(n))
def sky_body(P, x=300, y=150):
    if P["night"]:
        return circ(x, y, 22, P["moon"]) + circ(x + 9, y - 6, 20, P["sky0"], ' opacity=".0"')
    return circ(x, y, 34, P["sun"], ' opacity=".9"') + circ(x, y, 52, P["sun"], ' opacity=".18"')
def water(y, P, waves=True):
    s = rect(-10, y, W + 20, H - y, P["water"])
    if waves:
        r = random.Random(int(y))
        for i in range(14):
            wx, wy = r.uniform(0, W), r.uniform(y + 8, H - 10)
            s += rect(wx, wy, r.uniform(14, 40), 2, P["wave"], 1, ' opacity=".7"')
    return s

# ---------- palettes ----------
def pal(night, sky0, sky1, far, mid, near, water=None, sun="#FFD27A", dayWin=None, wave=None):
    return dict(night=night, sky0=sky0, sky1=sky1, far=far, mid=mid, near=near, water=water or mid, wave=wave or ("#fff" if not night else "#8C80D8"),
                sun=sun, moon="#FFF4D6", win="#FFD98A", dayWin=dayWin)
NIGHT = lambda sky1="#4A3C8F", water="#1E1848": pal(True, "#100C2A", sky1, "#30276F", "#221A57", "#140F36", water)

# ---------- scènes ----------
def eiffel(cx, base, hgt, fill):
    k = hgt / 300
    L = [(0, 0), (-3, 18), (-5, 42), (-9, 44), (-9, 50), (-15, 120), (-24, 124), (-24, 132), (-28, 182), (-42, 196), (-42, 208), (-58, 300), (-34, 300)]
    pts = [(cx + x * k, base - hgt + y * k) for x, y in L]
    arch = [(cx + x * k, base - hgt + y * k) for x, y in [(-26, 262), (-14, 244), (0, 239), (14, 244), (26, 262)]]
    R = [(cx - (p[0] - cx), p[1]) for p in reversed(pts)]
    return poly(pts + arch + R, fill)
def paris(P):
    b = H - 120; o = [stars(P, 1), sky_body(P, 330, 300)]
    o.append(hill(H - 250, 30, P["far"], 3))
    # Sacré-Cœur sur la butte
    sx, sy = 300, H - 268
    o += [rect(sx - 26, sy - 22, 52, 30, P["far"]), path(f"M{sx - 15},{sy - 22} Q{sx},{sy - 60} {sx + 15},{sy - 22} Z", P["far"]),
          rect(sx - 1.5, sy - 70, 3, 14, P["far"]), path(f"M{sx - 32},{sy - 10} Q{sx - 24},{sy - 34} {sx - 16},{sy - 10} Z", P["far"]),
          path(f"M{sx + 16},{sy - 10} Q{sx + 24},{sy - 34} {sx + 32},{sy - 10} Z", P["far"]), rect(sx + 30, sy - 52, 9, 50, P["far"]),
          path(f"M{sx + 29},{sy - 52} Q{sx + 34.5},{sy - 70} {sx + 40},{sy - 52} Z", P["far"])]
    o.append(eiffel(110, b - 40, 330, P["mid"]))
    if P["night"]:
        r = random.Random(9)
        o += [circ(110 + r.uniform(-40, 40) * (1 - t), b - 40 - 330 * t, 1.2, "#FFE7A3", ' opacity=".9"') for t in [r.random() for _ in range(40)]]
    x = -6; i = 0
    while x < W:
        w = 46 + (i * 17) % 22; h = 70 + (i * 29) % 40
        o.append(building(x, b + 10, w, h, P["near"], P, 100 + i, "mansard"))
        o.append(rect(x + 8, b + 10 - h - 22, 5, 12, P["near"]))
        x += w + 2; i += 1
    o.append(water(b + 10, P))
    return o
def marseille(P):
    o = [stars(P, 2), sky_body(P, 300, 160)]
    o.append(hill(H - 300, 70, P["far"], 5, 5, 1.0))
    # Notre-Dame de la Garde
    gx, gy = 120, H - 360
    o.append(path(f"M40,{H} Q{gx - 40},{gy + 30} {gx},{gy + 20} Q{gx + 50},{gy + 25} 260,{H} Z", P["mid"]))
    o += [rect(gx - 30, gy - 8, 60, 30, P["mid"]), rect(gx - 9, gy - 70, 18, 64, P["mid"]), poly([(gx - 9, gy - 70), (gx, gy - 82), (gx + 9, gy - 70)], P["mid"]),
          rect(gx - 2.5, gy - 100, 5, 20, P["mid"]), circ(gx, gy - 102, 3.5, P["mid"]),
          path(f"M{gx + 10},{gy - 8} Q{gx + 20},{gy - 30} {gx + 30},{gy - 8} Z", P["mid"])]
    b = H - 150
    x = -4; i = 0
    while x < W:
        w = 30 + (i * 13) % 20; h = 40 + (i * 23) % 36
        o.append(building(x, b, w, h, P["near"], P, 200 + i)); o.append(poly([(x - 2, b - h), (x + w / 2, b - h - 9), (x + w + 2, b - h)], P["near"]))
        x += w + 1; i += 1
    o.append(water(b, P))
    # bateaux du Vieux-Port
    for k, bx in enumerate([40, 110, 175, 250, 320]):
        y = b + 40 + (k % 2) * 30
        o += [path(f"M{bx - 22},{y} L{bx + 22},{y} L{bx + 15},{y + 9} L{bx - 15},{y + 9} Z", P["near"]), rect(bx - 1, y - 52, 2, 52, P["near"]),
              poly([(bx + 1, y - 50), (bx + 1, y - 6), (bx + 20, y - 8)], P["near"], ' opacity=".8"')]
    return o
def lyon(P):
    o = [stars(P, 3), sky_body(P, 300, 150)]
    o.append(path(f"M-10,{H} L-10,{H - 330} Q120,{H - 390} 230,{H - 300} Q300,{H - 260} 400,{H - 250} L400,{H} Z", P["far"]))
    # basilique de Fourvière + tour métallique
    fx, fy = 110, H - 370
    o += [rect(fx - 34, fy - 26, 68, 34, P["far"])] + [rect(fx + dx - 6, fy - 46, 12, 30, P["far"]) for dx in (-30, 30)] + \
         [rect(fx + dx - 7, fy - 50, 14, 5, P["far"]) for dx in (-30, 30)] + [poly([(fx - 24, fy - 26), (fx, fy - 42), (fx + 24, fy - 26)], P["far"])]
    tx, ty = 200, H - 330
    o.append(poly([(tx, ty - 90), (tx - 3, ty - 70), (tx - 10, ty), (tx + 10, ty), (tx + 3, ty - 70)], P["far"]))
    # tour « le Crayon »
    o += [rect(330, H - 330, 22, 120, P["mid"]), poly([(330, H - 330), (341, H - 350), (352, H - 330)], P["mid"])]
    b = H - 160
    cols = P["facades"]
    x = -4; i = 0
    while x < W:
        w = 34 + (i * 11) % 14; h = 60 + (i * 19) % 34
        f = cols[i % len(cols)]
        o.append(building(x, b, w, h, f, P, 300 + i)); o.append(poly([(x - 2, b - h), (x + w + 2, b - h), (x + w - 3, b - h - 8), (x + 3, b - h - 8)], P["roof"]))
        x += w + 1; i += 1
    o.append(water(b, P))
    o.append(path(f"M-10,{b + 70} Q195,{b + 40} 400,{b + 70} L400,{b + 80} Q195,{b + 50} -10,{b + 80} Z", P["near"]))  # passerelle
    return o
def montreal(P):
    o = [stars(P, 4), sky_body(P, 80, 150)]
    o.append(hill(H - 330, 40, P["far"], 7, 4, 2.2))
    o += [rect(258, H - 420, 3, 40, P["far"]), rect(250, H - 410, 19, 3, P["far"])]   # croix du mont Royal
    # tour du Stade olympique
    o.append(poly([(20, H - 230), (78, H - 430), (92, H - 428), (60, H - 230)], P["mid"]))
    o.append(path(f"M0,{H - 220} Q60,{H - 270} 140,{H - 220} Z", P["mid"]))
    b = H - 150
    for i, (x, w, h) in enumerate([(130, 34, 230), (166, 40, 300), (208, 30, 250), (240, 44, 340), (286, 36, 260), (324, 30, 210), (356, 40, 280), (100, 28, 170)]):
        o.append(building(x, b, w, h, P["mid"] if i % 2 else P["near"], P, 400 + i, "flat2"))
    o.append(water(b, P))
    # pont Jacques-Cartier
    o.append(path(f"M-10,{b + 30} L400,{b + 18} L400,{b + 26} L-10,{b + 38} Z", P["near"]))
    for px in (60, 180, 300):
        o += [path(f"M{px - 50},{b + 32 - px * .03} Q{px},{b - 40 - px * .03} {px + 50},{b + 30 - px * .03}", "none", f' stroke="{P["near"]}" stroke-width="3"'),
              rect(px - 3, b + 30 - px * .03, 6, 60, P["near"])]
    # Biosphère
    o.append(circ(330, b + 110, 34, "none", f' stroke="{P["near"]}" stroke-width="2.5"'))
    o += [path(f"M{296 + i * 9},{b + 110 - math.sqrt(max(0, 34 ** 2 - (i * 9 - 34) ** 2))} L{296 + i * 9},{b + 110 + math.sqrt(max(0, 34 ** 2 - (i * 9 - 34) ** 2))}", "none", f' stroke="{P["near"]}" stroke-width="1.2"') for i in range(1, 8)]
    return o
def kinshasa(P):
    o = [stars(P, 5), sky_body(P, 290, 170)]
    o.append(hill(H - 270, 20, P["far"], 11, 5))
    # tour de l'Échangeur (Limete)
    tx = 95
    o += [poly([(tx - 13, H - 230), (tx - 8, H - 520), (tx + 8, H - 520), (tx + 13, H - 230)], P["mid"]), rect(tx - 15, H - 560, 30, 46, P["mid"]),
          rect(tx - 7, H - 552, 14, 26, P["sky1"]), rect(tx - 2, H - 590, 4, 30, P["mid"])]
    b = H - 190
    for i, (x, w, h) in enumerate([(150, 38, 150), (192, 30, 200), (226, 44, 130), (275, 32, 175), (312, 40, 120), (-5, 40, 110), (36, 34, 90)]):
        o.append(building(x, b, w, h, P["mid"], P, 500 + i, "flat2"))
    o += [palm(px, b + 4, ph, P["near"], ln) for px, ph, ln in [(20, 110, 10), (140, 90, -8), (210, 120, 12), (360, 100, -10)]]
    o.append(rect(-10, b, W + 20, 12, P["near"]))
    o.append(water(b + 12, P))
    # pirogues sur le fleuve
    for bx, y in [(90, b + 90), (260, b + 140)]:
        o += [path(f"M{bx - 40},{y} Q{bx},{y + 14} {bx + 40},{y} Z", P["near"]), rect(bx + 8, y - 26, 2, 26, P["near"]),
              circ(bx + 9, y - 30, 4, P["near"])]
    return o
def alger(P):
    o = [stars(P, 6), sky_body(P, 320, 140)]
    o.append(path(f"M-10,{H} L-10,{H - 300} Q140,{H - 420} 400,{H - 360} L400,{H} Z", P["far"]))
    # Maqam Echahid : trois palmes de béton
    mx, my = 300, H - 380
    for dx, ang in [(-22, -8), (22, 8), (0, 0)]:
        o.append(path(f"M{mx + dx - 9},{my + 10} Q{mx + dx * .6 - 4 + ang},{my - 120} {mx},{my - 175} Q{mx + dx * .6 + 4 + ang},{my - 120} {mx + dx + 9},{my + 10} Z", P["mid"]))
    o.append(rect(mx - 8, my - 60, 16, 10, P["mid"]))
    # Casbah : petites maisons blanches en escalier
    r = random.Random(61)
    for row in range(10):
        y = H - 350 + row * 22; x = -10 + (row % 2) * 9
        while x < 60 + row * 22:
            w = r.uniform(18, 30); h = r.uniform(16, 26)
            o.append(rect(x + 3, y - h + 12, w, h + 28, P["shade"]))
            o.append(rect(x, y - h + 10, w, h + 30, P["houses"]))
            if r.random() > .4: o.append(rect(x + w / 2 - 2, y - h + 18, 4, 6, P["win"] if P["night"] else P["near"], 0, ' opacity=".7"'))
            x += w + 1
    b = H - 120
    o.append(rect(-10, b - 10, W + 20, 14, P["near"]))
    o.append(water(b + 4, P))
    return o
def provence(P):
    o = [stars(P, 7), sky_body(P, 300, 180)]
    o.append(hill(H - 330, 30, P["far"], 13, 4, .5))
    o.append(hill(H - 290, 20, P["mid"], 17, 5, 2))
    # mas et cyprès
    mx, my = 250, H - 300
    o += [rect(mx, my - 26, 60, 30, P["near"]), poly([(mx - 4, my - 26), (mx + 30, my - 42), (mx + 64, my - 26)], P["roof"]), rect(mx + 26, my - 14, 8, 14, P["far"])]
    o += [path(f"M{cx},{my + 4} Q{cx - 9},{my - 30} {cx},{my - 60 - k * 8} Q{cx + 9},{my - 30} {cx},{my + 4} Z", P["cypress"]) for k, cx in enumerate([215, 228, 330])]
    # rangs de lavande en perspective
    top = H - 280
    o.append(rect(-10, top, W + 20, H - top, P["field"]))
    vx = 195
    for i in range(-9, 10):
        x0 = vx + i * 70; x1 = vx + i * 6
        o.append(poly([(x1 - 2, top), (x1 + 2, top), (x0 + 18, H), (x0 - 18, H)], P["lav"]))
    return o
def dakar(P):
    o = [stars(P, 8), sky_body(P, 110, H - 360) if not P["night"] else sky_body(P, 300, 150)]
    o.append(path(f"M180,{H - 250} Q240,{H - 330} 290,{H - 270} Q320,{H - 320} 360,{H - 280} Q390,{H - 260} 410,{H - 250} Z", P["far"]))  # les Mamelles
    o += [rect(286, H - 312, 10, 30, P["far"]), rect(283, H - 318, 16, 7, P["far"])]   # phare
    if P["night"]: o.append(path(f"M291,{H - 315} L200,{H - 345} L200,{H - 330} Z", "#FFE7A3", ' opacity=".35"'))
    b = H - 250
    o.append(water(b, P))
    o.append(path(f"M-10,{H} L-10,{H - 150} Q200,{H - 190} 400,{H - 140} L400,{H} Z", P["sand"]))
    # baobab
    bx, by = 70, H - 175
    o += [path(f"M{bx - 16},{by} Q{bx - 10},{by - 60} {bx - 12},{by - 90} L{bx + 12},{by - 90} Q{bx + 10},{by - 60} {bx + 16},{by} Z", P["near"])]
    for a, l in [(-150, 46), (-115, 40), (-70, 42), (-30, 48)]:
        rad = math.radians(a); ex, ey = bx + l * math.cos(rad), by - 88 + l * math.sin(rad)
        o.append(path(f"M{bx - 3},{by - 86} L{ex:.1f},{ey:.1f} L{ex + 4:.1f},{ey + 3:.1f} L{bx + 3},{by - 80} Z", P["near"]))
        o.append(circ(ex, ey - 3, 9, P["near"]))
    o += [palm(px, H - 160, ph, P["near"], ln) for px, ph, ln in [(345, 110, -10), (372, 85, 8)]]
    # pirogues colorées
    for k, (px, py) in enumerate([(215, H - 150), (310, H - 105), (160, H - 70)]):
        c = P["boats"][k % len(P["boats"])]; c2 = P["boats"][(k + 1) % len(P["boats"])]
        o += [path(f"M{px - 55},{py - 18} Q{px},{py + 18} {px + 55},{py - 18} L{px + 50},{py - 6} Q{px},{py + 22} {px - 50},{py - 6} Z", c),
              path(f"M{px - 52},{py - 13} Q{px},{py + 20} {px + 52},{py - 13} L{px + 51},{py - 10} Q{px},{py + 23} {px - 51},{py - 10} Z", c2),
              path(f"M{px - 55},{py - 18} L{px - 64},{py - 30} L{px - 50},{py - 16} Z", c), path(f"M{px + 55},{py - 18} L{px + 64},{py - 30} L{px + 50},{py - 16} Z", c)]
    return o
def bruxelles(P):
    o = [stars(P, 9), sky_body(P, 80, 160)]
    o.append(hill(H - 260, 14, P["far"], 19, 5))
    # Atomium
    ax, ay, s = 290, H - 400, 46
    nodes = [(0, -1.4), (-1, -.7), (1, -.7), (-1, .7), (1, .7), (0, 0), (0, 1.4), (-.45, -.25), (.45, .25)]
    pts = [(ax + x * s, ay + y * s) for x, y in nodes]
    for i, j in [(0, 1), (0, 2), (1, 3), (2, 4), (3, 6), (4, 6), (0, 5), (5, 6), (1, 5), (2, 5), (3, 5), (4, 5)]:
        o.append(f'<line x1="{pts[i][0]:.1f}" y1="{pts[i][1]:.1f}" x2="{pts[j][0]:.1f}" y2="{pts[j][1]:.1f}" stroke="{P.get("atom", P["mid"])}" stroke-width="6"/>')
    o += [circ(x, y, 15, P.get("atom", P["mid"])) for x, y in pts]
    o += [rect(ax - 30, ay + 1.4 * s, 6, 120, P["mid"]), rect(ax + 24, ay + 1.4 * s, 6, 120, P["mid"]), rect(ax - 3, ay + 1.4 * s, 6, 120, P["mid"])]
    if P["night"]: o += [circ(x - 4, y - 4, 2, "#FFE7A3") for x, y in pts[:7]]
    # Hôtel de Ville (flèche gothique) et maisons à pignons de la Grand-Place
    hx, b = 90, H - 140
    o += [rect(hx - 50, b - 90, 100, 90, P["near"]), rect(hx - 10, b - 190, 20, 100, P["near"]), poly([(hx - 10, b - 190), (hx, b - 260), (hx + 10, b - 190)], P["near"]),
          rect(hx - 1, b - 275, 2, 18, P["near"])] + [poly([(hx - 50 + k * 20, b - 90), (hx - 40 + k * 20, b - 104), (hx - 30 + k * 20, b - 90)], P["near"]) for k in range(5)]
    o.append(windows(hx - 46, b - 86, 92, 80, P, 901))
    x = 145; i = 0
    while x < W:
        w = 34; h = 70 + (i * 13) % 26
        o.append(building(x, b, w, h, P["near"], P, 950 + i))
        st = [(x, b - h)] + [(x + w * k / 6, b - h - (k if k <= 3 else 6 - k) * 7 - (0 if k % 2 else 0)) for k in range(1, 6)] + [(x + w, b - h)]
        o.append(poly(st, P["near"]))
        x += w + 2; i += 1
    o.append(rect(-10, b, W + 20, H - b, P["near"]))
    return o

# ---------- les 15 fonds ----------
LAV = dict(dayWin="#FFFFFF")
FONDS = [
    ("paris-jour", "Paris de día", paris, pal(False, "#FBF9FF", "#F3E3F4", "#E9DDF7", "#CFC2F2", "#B9A8EE", "#DCD3F7", dayWin="#E6DEFA")),
    ("paris-noche", "Paris de noche", paris, NIGHT()),
    ("marseille-jour", "Marseille de día", marseille, pal(False, "#F7FBFF", "#DCEFF8", "#CFE3EE", "#B5D3E6", "#8FB9D6", "#A9D7E6", "#FFCF7A", dayWin="#E9F4FA")),
    ("marseille-noche", "Marseille de noche", marseille, NIGHT("#2B3C7A", "#1A2552")),
    ("lyon-jour", "Lyon de día", lyon, dict(pal(False, "#FFFBF5", "#FCE5D2", "#F1DCCB", "#E6C8B0", "#C9A58C", "#E2D3EC"), facades=["#F2C9A4", "#EDB98F", "#F5D7B0", "#E8A98A", "#F0C68E"], roof="#C98B6E")),
    ("lyon-noche", "Lyon de noche", lyon, dict(NIGHT("#3F2C6E"), facades=["#2A2160", "#251C55", "#2F2468"], roof="#1A1440")),
    ("montreal-jour", "Montréal de día", montreal, pal(False, "#F8FBFF", "#E2ECFA", "#D6E2F3", "#BCCDEB", "#A3B7E2", "#C9D8F2", dayWin="#E8EFFB")),
    ("montreal-noche", "Montréal de noche", montreal, NIGHT("#26346E", "#18204A")),
    ("kinshasa-jour", "Kinshasa de día", kinshasa, pal(False, "#FFFCF2", "#FBE8C4", "#F2DFC0", "#E2C79C", "#B9A06E", "#D9C9A0", "#FFC65A", dayWin="#F7EBD3")),
    ("kinshasa-noche", "Kinshasa de noche", kinshasa, NIGHT("#4A2F6E", "#231A47")),
    ("alger-jour", "Alger de día", alger, dict(pal(False, "#F8FCFF", "#E0F0F7", "#D5E6EE", "#B9D2E0", "#8DB1C8", "#9FCBE0", dayWin="#EAF3F8"), houses="#FFFFFF", shade="#C3D8E4")),
    ("alger-noche", "Alger de noche", alger, dict(NIGHT("#2C3570", "#18204A"), houses="#3A3180", shade="#1A1545")),
    ("provence", "Campos de lavanda", provence, dict(pal(False, "#FFFDF8", "#FBEBD6", "#E7DCF3", "#D9CBEF", "#F4E6D2", "#E0D6F5"), roof="#E2A07E", cypress="#8E9F7A", field="#D8CDF4", lav="#A592E6")),
    ("dakar", "Atardecer en Dakar", dakar, dict(pal(False, "#FFF6EC", "#FBC9A6", "#E7A99A", "#D9958C", "#7E5A6E", "#F2B49A", "#FFE1A8", wave="#FFE9D6"), sand="#F6D9B8", boats=["#E85D75", "#3FA7A0", "#F2B33D"])),
    ("bruxelles-noche", "Bruselas de noche", bruxelles, dict(NIGHT("#3E3388"), atom="#6A5EC2")),
]

def render(key, scene, P):
    body = "".join(scene(P))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice">'
            f'<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{P["sky0"]}"/><stop offset="1" stop-color="{P["sky1"]}"/></linearGradient></defs>'
            f'<rect width="{W}" height="{H}" fill="url(#s)"/>{body}</svg>')

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for key, name, scene, P in FONDS:
        open(os.path.join(OUT, key + ".svg"), "w").write(render(key, scene, P))
    print(len(FONDS), "fonds écrits dans bg/")
